import type { NextRequest } from 'next/server';
import { MiddlewareRequest } from '@netlify/next';

export async function middleware(nextRequest: NextRequest) {
  // only localize the home page
  if (nextRequest.nextUrl.pathname !== '/') {
    return;
  }

  // enhance the standard Next.js middleware so we can transform the response
  const middlewareRequest = new MiddlewareRequest(nextRequest);
  const response = await middlewareRequest.next();

  // figure out where the user has requested the site from
  const geo = nextRequest.geo;
  const address = geo?.city
    ? `${geo.city}, ${geo.region}, ${geo.country}`
    : 'Missoula, MT, US';

  // load the latitude and longitude for the user's location
  const api = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  api.searchParams.set('address', address);
  // @ts-ignore: Netlify Edge Functions run on Deno & Next.js doesn't know that
  api.searchParams.set('key', Deno.env.get('NEXT_PUBLIC_GOOGLE_API_KEY') ?? '');

  const res = await fetch(api.toString());
  const data = await res.json();
  const [result] = data.results;

  // if we don't get a valid location back from Google, bail
  if (!result || !result.geometry || !result.geometry.location) {
    return;
  }

  // transform the Next.js page props to use the updated data
  response.setPageProp('address', address);
  response.setPageProp('center', result.geometry.location);

  return response;
}
