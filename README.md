# NodeJS server template

This is a simple template I use for building APIs/servers with React clients.
To use it with react clients I run `npx create-react-app client` in the root directory.

## Structure

* `assets` - add any images/icons relevant to the project, they might be used for documentation or for the server
* `controllers` - add functionality to be handled in your app
* `middleware` - any middleware functions you have, for example for user authorization on restricted routes
* `models` - this comes mainly as a consequence of using mongoose to link the app to MongoDB collections; but can be adapted to your preferred database
* `routes` - handle data validation, add middleware, use controller defined functionality
* `utils` - any functionality that can be used globally, could be seen as helper classes for your app
* `server.js` - this is the main app file, here you bring everything together
