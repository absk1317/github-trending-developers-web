This project renders trending developers in any coding language in three different periods, namely daily, weekly and monthly.

#### The Project is written with help of React 16.12.0, and Redux 4

#### There is no concept of local state anywhere, and redux has been utilized to its fullest.

#### Have used locales file for easy localization, if desired.

#### Styles are put up in separate files, in the same heirarchy as the component file, we haven't used inline styles anywhere.

#### All requests to port 3001 with /api have been proxied, and won't be handled by react.

#### We have used MVC patter for meeting our requirements.
  Reducers are models,
  Actions are controller actions, and,
  Views as views


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This command will remove the single build dependency from your project, copy respective config files like webpack config, babel config and all in local directory
