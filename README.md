This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
#Important
The backend needs to run based on this project: https://github.com/VioletSH/Violet_Backend
#Folder Structure and Explanation
Note: inside most of component folders that isn't detailed exists a index.js file with the logic and design and a .css with the styles of that component
.
├── public                     # Generated default by react, the root html
├── src                        # Main Proyect Structure
│   ├── assets                 # Table 
│   │   ├── css                # Custom css icon-font
│   │   └── img                # Images used by the app
│   ├── components             # Reusable Components are in this folder
│   │   ├── Banner             # Top info
│   │   ├── FloatingButton     # Reusable floating right bottom button and multiple options
│   │   ├── Hexagon            # Main shape of the app, exports a svg with hexagon shape
│   │   ├── HexButton          # Two types of buttons, cancel and accept
│   │   └── Modal              # Base component to build and work on Modals
│   ├── constants              #
│   │   ├── icons.js           # Custom css icon-font
│   │   └── routes.js          # Images used by the app
│   ├── services               # API connection to backend (developed in Sails.js)
│   ├── views                  # Full views that uses components inside component folder are in this folder
│   │   ├── Cursos             # After Login, the Curso/Grupo selection begins here
│   │   ├── Dashboard          # Main view, Modules, activities and contens appear here
│   │   │   └── Modals         # Images used by the app
│   │   ├── Estudiantes        # The view os student of each group
│   │   ├── Home               # This component handles as parent of everything except login, process and                                 # defines the logics/methods reusables in all the app
│   │   └── Login              # Initial view, credential authentications
│   ├── App.css                # Generated default by react, used as root element
│   ├── App.js                 # Root element logic
│   ├── App.test.js            # Testing 
│   ├── index.css              # Global css, variables and commond styles are here
│   ├── index.js               # Global logic, loads base resources
│   └── ...
└── ...
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
