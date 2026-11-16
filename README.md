## What this is:

An open source booking engine to allow properties to accept bookings directly from guests. You can
modify and host this app yourself, create a booking engine channel on Channex and you will be able
to create a bookings at the following URL `app-location.com/{channel_id}`


## How to use it:

Based on create-react-app so set required params in `.env`, build by running `yarn build` in project
directory and then deploy wherewer you want. Use `yarn start` to run in dev mode.

Note on .env: `REACT_APP_BASE_PATH` is required if you want to host the app on url like
`your-host.com/path/{channel_id}`, in this case `/path` should be set as a base path in config, otherwise it can be ommitted.
`REACT_APP_PUBLIC_URL` - should point to directory static assets will be served from.
`REACT_APP_TURNSTILE_SITE_KEY` - optional [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) site key.
When set, the booking form shows a Turnstile challenge and sends its token with `push_booking` in the
`cf-turnstile-response` header. The page hostname must be added to the widget's hostnames in Cloudflare.
Leave it unset to disable the challenge.
