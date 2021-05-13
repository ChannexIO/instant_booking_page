## What this is:

An open source booking engine to allow properties to accept bookings directly from guests. You can
modify and host this app yourself, create a booking engine channel on Channex and you will be able
to create a bookings at the following URL `app-location.com/{channel_id}`

Example of booking engine:
https://channexio.github.io/instant_booking_page/8f3610c2-ec33-49a8-80ce-a3082375df34?currency=GBP&checkinDate=21-04-2021&checkoutDate=24-04-2021&childrenAge=&adults=2

## How to use it:

Based on create-react-app so set required params in `.env`, build by running `yarn build` in project
directory and then deploy wherewer you want. Use `yarn start` to run in dev mode.

Note on .env: `REACT_APP_BASE_PATH` is required if you want to host the app on url like
`your-host.com/path/{channel_id}`, in this case `/path` should be set as a base path in config, otherwise it can be ommitted.
`REACT_APP_PUBLIC_URL` - should point to directory static assets will be served from.