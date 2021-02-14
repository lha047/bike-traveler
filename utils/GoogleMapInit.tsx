import { googleMapUrl } from '../shared/fetchHelpers';

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
export const loadMap = (): HTMLScriptElement => {
  if (key) {
    const mapUrl = googleMapUrl(key);

    const scripts = document.getElementsByTagName('script');
    const mapsScript = Array.from(scripts).filter(
      ({ src }) => src === mapUrl
    )[0];
    if (mapsScript) {
      return mapsScript;
    }
    const newScript = document.createElement('script');
    newScript.src = mapUrl;
    newScript.async = true;
    newScript.defer = true;
    window.document.body.appendChild(newScript);
    return newScript;
  }
  throw new Error('No api key defined');
};
