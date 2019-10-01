# Text Message Control Center

Text Message Control Center is an application which displays all text messages sent via  a Twilio phone number. It has the functionality to send messages via POST requests to its server. 

The backend is handled with Node.js/Express, the frontend React. 

Addressing its request handling: 
* POST requests to '/' with json or urlEncoded "body" and "rec" parameters send a message "body" to phone number "rec"
* GET requests to '/messages' receive the most recent 10 messages sent
* POST requests to '/messages' with json or urlEncoded "url" as a REST API url receive a json response of "url"

## Dependencies

See package.json and react_client/package.json for dependencies

## Built With

Backend
* twilio: https://www.npmjs.com/package/twilio
* node-fetch: https://www.npmjs.com/package/node-fetch
* http-errors: https://www.npmjs.com/package/http-errors
* express: https://www.npmjs.com/package/http-errors
* debug: https://www.npmjs.com/package/debug

Frontend
* react: https://www.npmjs.com/package/react
* react-dom: https://www.npmjs.com/package/react-dom
* react-scripts: https://www.npmjs.com/package/react-scripts
* react-headroom: https://www.npmjs.com/package/react-headroom
* react-infinite-scroller: https://www.npmjs.com/package/react-infinite-scroller

## Author

Ben Tilden
