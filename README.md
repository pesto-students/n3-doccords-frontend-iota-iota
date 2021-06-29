# Doccords

Users can maintain, analyze and share medical documents.

## Getting Started
These instructions will give you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](https://github.com/Elangodevguy/doccords#deployment) for notes on deploying the project on a live system.

## Prerequisites
Requirements for the software and other tools to build, test and push

we need node version 10.0.0 and above or you can download from [here](https://nodejs.org/en/download/)
you can use `node -v` to check node version

We need npm version 6.0.0 and above - this will be automatcally get installed while installing Node js using installer
you can use `npm -v` to check npm version

Install VS Code editor, We need VS code IDE to start our development process

need to install `Prettier` and `ESLint` as VS code package

## Installing
In this section we will tell you step by step process, that will tell you how to get a development environment running

Clone this project repository using
### `git clone https://github.com/Elangodevguy/doccords.git`

after you clone doccords repo, move to the root of the project directory in your terminal

Install both dependency and dev-dependency using
### `npm install`  or  `npm i` 

Setting up local .env
to setup local .env, copy .env file from develop branch.

Run the app in development mode
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Testing
Launches the test runner in the interactive watch mode.\
### `npm test`
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Production-build
Builds the app for production to the `build` folder.\

### `npm run build`
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Other available scripts

### Linting
To lint our entire project expect build folder, we can run 
### `npm run lint`
we don't need to run the above commoand for every change in our file, VS code will automatically tell the places where ESLint rules are getting broke, thanks to `.eslintrc.js` which conatins all the standard rules for our project.

### Linting --fix
Most of our obovious ESLint errors will be fix by running the below command
### `npm run lint-fix`

### Pretty code
To make our coding practices standard with all our team members, we are using Prettier
### `npm run format`

### Pre-commit hook
In this project we are using `huskey` and `lint-staged` to hook particular scripts to pre commit hook,
whenever we do `git commit -m 'message'` huskey and lint-staged will call the `pre-commit` hook, from the hook we will call our scripts in the order of
`npm run lint`, `npm run lint-fix`, `npm run format` if anyone of this script gets failed our commit will not happen, so this will give standard structure to our code base.

## Deployment
We have integrated `Circle CI\CD` tool to keep our deployment seamless
Whenever we `push` something in any of our branch `Circle CI\CD` will get called and there also it will run the `ESLint` and `Prettier` scripts if any of the script got failed it will notify all the users in the repo

but when we `push` something to develop branch it will go one step further and `Circle CI\CD` will proceed with build and will sync our local `build/` folder to AWS S3 static bucket. Once the deployment is done `Circle CI\CD` will notify us in slack with the corresponding status

# [website link](https://d35a2073q06o61.cloudfront.net/)
