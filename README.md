# LenDen Web App - Version 2 - React App

Peer to Peer lending platform in India.

## Development Setup

- Clone Repository: `git clone HTTPS/SSH Url`
- Move to root directory: `cd lenden-web-app-v2`
- Install dependency: `npm install`
- Starting Proejct: `npm start`
- Open link in browser: [http://localhost:3000/](http://localhost:3000/)

## Folder Structure

    lenden-web-app-v2
    │
    └───src
    │   │
    │   └───api-integrations
    │       └───common (Director to store all image files)
    │           └───connect.js (Has helper methods for API Fetch call, File Upload & Firebase referral link)
    │           └───constants.js (Contains backend communication constants)
    │           └───local-storage.js (Haas helper methods to access local storage manipulations)
    │           └───urls.js (All backend api urls & other 3rd party urls are maintained as a constants)
    │       └───modules (All the backend api are created as a separate function & grouped based on their nature)
    │   |
    │   │
    │   └───assets
    │       └───images (Director to store all image files)
    │       └───styles (Director to wrap all style dependencies of the application)
    │           └───lib (Folder to all external library dependencies)
    │           └───styles.scss (Parent style sheet where application level common styles are mentioned)
    │   |
    |   └───common
    │       └───application-constants.js (Contains all application level constants)
    │       └───common.js (Has generic helper methods that are used across the application)
    │   |
    │   └───components (Parent directory for react components)
    │       └───common (Common helper components)
    │       └───layouts
    │           └───header (Application header layout)
    │       └───pages (Contains each folder for each page and its respective sub components)
    │   |
    │   └───routes (Parent directory for react router configuration)
    │       └───on-boarding-routes.js (Hybrid route configuration to control onboarding redirection)
    │       └───private-routes.js (Protected route configuration to control user session)
    │       └───routes.js (Default router configuration with component initialization & path settings)

## Package Dependencies

@material-ui/core: ^4.9.2<br />
@material-ui/icons: ^4.9.1<br />
@testing-library/jest-dom: ^4.2.4<br />
@testing-library/react: ^9.3.2<br />
@testing-library/user-event: ^7.1.2<br />
chart.js: ^2.9.3<br />
chartjs-plugin-annotation: ^0.5.7<br />
lodash: ^4.17.15<br />
material-ui-flat-pagination: ^4.1.0<br />
material-ui-popup-state: ^1.5.3<br />
moment: ^2.24.0<br />
node-sass: ^4.13.1<br />
react-chartjs-2: ^2.9.0<br />
react-color-materialui-popover: ^1.0.3<br />
react-countdown: ^2.2.1<br />
react-minimal-pie-chart: ^6.0.1<br />
react-router-dom: ^5.1.2<br />
react-slick: ^0.25.2<br />
react-step-progress-bar: ^1.0.3<br />
slick-carousel: ^1.8.1<br />
toastr: ^2.1.4<br />
universal-cookie: ^4.0.3<br />
prettier: ^1.19.1<br />

## Testing Server

[Start Testing](http://lenden-web-app.s3-website.ap-south-1.amazonaws.com)

## Deployment

- Staging Deployment: run command on terminal `npm run deploy`

## Development Dependency Docs

- Design Framework - [React Material UI - Docs](https://material-ui.com/getting-started/usage/)
- Development Framework - [React Docs](https://reactjs.org/docs/getting-started.html)

## Design Resources

- Design: [Figma Link](https://www.figma.com/file/Xqrv17sZ4tKCv3yitsKuUi/LDC_New(web)?node-id=12%3A119)
- Fonts: [Google Fonts](https://fonts.google.com/specimen/Quicksand)
- Image: Export from the design inspect option.

## Development Resources

- API communication docs provided by Lenden Club.

## Developer Best Practice

- Maintain proper namespacing for folders, files, variable and function declarations.
- Format code using [Prettier](https://www.npmjs.com/package/prettier) package.
- Always create feature or bug branches and then merge with stable master branch.
- Provide proper commit messages & split commits meaningfully.
