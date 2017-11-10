const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));


// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

}

app.get('/webhook', (req, res) => {
  // verify webhook
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }

});

app.post('/webhook', (req, res) => {
  // Parse the req body from the post
  let body = req.body;

  // check the webhook evnet is from a Page
  if(body.object === 'page'){
    body.entry.forEach(function(entry){
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      res.status(200).send('EVENT_RECEIVED');
    });
  }else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

app.listen(process.env.PORT || 3000);
