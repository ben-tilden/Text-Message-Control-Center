# Text Message Control Center

Text Message Control Center is an application which displays all text messages sent via  a Twilio phone number. It has the functionality to send messages via POST requests to its server. This is the backend of the application.

Addressing its request handling:
* POST requests to '/' with json or urlEncoded "body" and "rec" parameters send a message "body" to phone number "rec"
* GET requests to '/messages' receive the most recent 10 messages sent
* POST requests to '/messages' with json or urlEncoded "url" as a REST API url receive a json response of "url"

## Dependencies

See package.json for dependencies

## Built With

* twilio: https://www.npmjs.com/package/twilio
* node-fetch: https://www.npmjs.com/package/node-fetch
* http-errors: https://www.npmjs.com/package/http-errors
* express: https://www.npmjs.com/package/http-errors
* debug: https://www.npmjs.com/package/debug

## Author

Ben Tilden
