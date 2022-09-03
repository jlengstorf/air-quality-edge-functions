# Show Local Air Quality Based on the User's Location

Use AQI data to show the air quality near the current user. This is built using Next.js Advanced Middleware and powered by Netlify Edge Functions.

See the demo: https://air-quality-edge-functions.netlify.app

## Dev Setup

To run this yourself, you need two sets of credentials:

1.  `AQICN_API_KEY` — this is free and can be requested from the [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/).
    
    This is used to create a map overlay showing the air quality on a map. ([More info in the AQI docs.](https://aqicn.org/faq/2015-09-18/map-web-service-real-time-air-quality-tile-api/))

2.  `GOOGLE_API_KEY` — this has a free tier and is created on the [Google Maps Platform credentials page](https://console.cloud.google.com/project/_/google/maps-apis/credentials).

    You need to create a project (the credentials page will guide you through this) and enable both the [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) and the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start).

[Create a Netlify site](https://docs.netlify.com/welcome/add-new-site/), then [add the above credentials as env vars](https://docs.netlify.com/environment-variables/overview/#site-environment-variables).

### Shortcut: Do it all via CLI!

> **Note:** This assumes you have the [GitHub CLI](https://cli.github.com/) installed, which I highly recommend if you work regularly with GitHub.

```bash
# fork this repository
gh repo fork jlengstorf/air-quality-edge-functions

# move into the newly forked and cloned repo
cd air-quality-edge-functions/

# install dependencies
npm i

# install the Netlify CLI if you don't already have it
# details: https://docs.netlify.com/cli/get-started/
npm i -g netlify-cli

# create a new Netlify site
ntl init

# add your env vars
ntl env:set AQICN_API_KEY "<your_key_here>"
ntl env:set GOOGLE_API_KEY "<your_key_here>"

# start the dev server
ntl dev
```