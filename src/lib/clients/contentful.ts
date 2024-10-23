// import { PREVIEW } from '$env/static/private'
import contentful from 'contentful'

const preview = false
export const content = contentful.createClient({
  space: '3oq0uupikmfu',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? '8d2Ir4YNVKClayVLOcXcON21eCM9ilNYhxEEDcseNZc' : 'ICsq0ujTI6QRHz1mrtjF-74-8MCL1A6A_mCKfsodjQ0',
}).withoutUnresolvableLinks