## What this is:
An web application to allow create bookings for hotel channels on channex.io. Build and host this app, create a hotel channel on channex.io and you will be able to create a booking at `app-location.com/{channel_id}`

## How to use it:
Based on create-react-app so set required params in `.env`, build by running `yarn build` in project directory and then deploy wherewer you want. Use `yarn start` to run in dev mode.

Note on .env:
`REACT_APP_BASE_PATH` is required if you want to host the app on url like `your-host.com/path/{channel_id}`, in this case `/path` should be set as a base path in config.