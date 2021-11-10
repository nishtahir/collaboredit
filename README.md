# Collaboredit

A minimal collaborative text editor for technical interviews inspired by collabedit.

# Setup

With your firebase instance setup, you'll need to provide a `src/secrets.js` file that 
provides the following exports

```
export default {
  firebase: {
    apiKey: ...,
    authDomain: ...,
    databaseURL: ...,
    projectId: ...,
    storageBucket: ...,
    messagingSenderId: ...,
    appId: ...,
  },
};
```

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.