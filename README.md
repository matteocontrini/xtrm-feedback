xtrm-feedback
=============

How can we improve the way people learn at school? Our project consists of a Spark Core device connected with 4 buttons, which are associated to 4 possible answers to a question. The teacher tells the questions, every student chooses the answer he thinks it best fits and results are shown on a web page.

## Current status

- Node.js server 0.3.1
  - the TCP server gets data from the boards (Arduino, Spark)
  - the data is forwaded to the browser through a Socket.IO JavaScript socket
  - the Express app mounted on an HTTP server shows the page content
  - the web page (not complete) shows statistics about the collected data
- Arduino sketch
  - the board detects when a button is pressed
  - the Ethernet shield is used to send the data to the Node.js server
- Spark project
  - working with 4 buttons
  - the Wi-Fi integrated connectivity is used to send data to the Node.js through a TCP socket

## How to use the server?

- Install GitHub and clone the repository
- Make sure you have node.js (http://nodejs.org/) and NPM installed
- Install missing modules (Terminal --> cd to repository directory --> xtrm-feedback-server --> `npm install`)
- Launch the server (`node server.js`)

## How to use the Spark project

- Configure your Spark for Wi-Fi connection
- Change configuration variables in the code
- Verify and load firmware

## How to use the Arduino sketch

- Plug the Ethernet shield onto the Arduino board
- Change configuration variables in the sketch
- Verify and upload
