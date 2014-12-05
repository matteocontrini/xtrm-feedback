xtrm-feedback
=============

## Current status

- Node.js server first draft.
  - the TCP server gets data from the boards (Arduino, Spark)
  - the data is forwaded to the browser through a Socket.IO JavaScript socket
  - the Express app mounted on an HTTP server shows the page content

## How to use?

- Install GitHub
- Clone the repository
- Make sure you have node.js (http://nodejs.org/) and NPM installed
- Install missing modules (Terminal --> cd to repository directory --> xtrm-feedback-server --> `npm install`)
- Launch the server (`node server.js`)
