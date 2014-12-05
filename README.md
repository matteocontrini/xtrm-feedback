xtrm-feedback
=============

## Current status

- Node.js server first draft.
  - the TCP server gets data from the boards (Arduino, Spark)
  - the data is forwaded to the browser through a Socket.IO JavaScript socket
  - the Express app mounted on an HTTP server shows the page content
- Arduino sketch
  - the board detects when a button is pressed
  - the Ethernet shield is used to send the data to the node.js server

## How to use the server?

- Install GitHub and clone the repository
- Make sure you have node.js (http://nodejs.org/) and NPM installed
- Install missing modules (Terminal --> cd to repository directory --> xtrm-feedback-server --> `npm install`)
- Launch the server (`node server.js`)
