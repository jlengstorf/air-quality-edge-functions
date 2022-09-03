import { Wrapper } from '@googlemaps/react-wrapper';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
