## What this is:
An open source booking engine to allow properties to accept bookings directly from guests. You can modify and host this app yourself, create a booking engine channel on Channex and you will be able to create a bookings at the following URL `app-location.com/{channel_id}`

Example of booking engine: https://channexio.github.io/instant_booking_page/91dd90ed-826f-40c6-bdbf-fe7390bcc142?currency=USD

## How to use it:
Based on create-react-app so set required params in `.env`, build by running `yarn build` in project directory and then deploy wherewer you want. Use `yarn start` to run in dev mode.

Note on .env:
`REACT_APP_BASE_PATH` is required if you want to host the app on url like `your-host.com/path/{channel_id}`, in this case `/path` should be set as a base path in config.
