# Intro

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template. It uses [redux-saga](https://redux-saga.js.org/) to handle asynchronous things from Redux and uses a version of json-sever through GraphQL.

# Start the project

run `yarn start` to start React server
run `yarn mock:server` to start the json-server. Note: json server must be installed globally

# E2E tests

For time saving I've added only the test for the main reducer on each slice, eventually when I get more time I could add a test for each reducer.

# Future Improvements

While building the app some things that could be done to better improve my implementation can be:

- Add usage of GraphQL (can be used in combination of json-server)
- I added a context provider with a Theme, even tough I didn't have time to implement it now, a switch between themes could be added in the future.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
