require('dotenv').config();

// Required Libraries for NodeJS
const express = require("express");
const app = express();
const port = 3000;

// Access the Account SID and Authorization Token from the .env file. Credentials can be found in the Twilio console.
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

// Required modules from the Twilio library
const twilio = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const VoiceResponse = require('twilio').twiml.VoiceResponse;


// Webhook to handle incoming SMS messages to the Twilio Phone Number using Twilio Messaging Response
app.post("/btw1", async (req, res) => {
    const twiml = new MessagingResponse()
    twiml.message(`It was nice to meet everyone, here are my contact details: kchresfield@twilio.com`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString())
});














// Function used to call customers back with a message using Twilio Voice Response
const callBack = async () => {
    let records = await twilio.messages.list({to: twilioNumber}); // access list of users who interacted with Twilio number
    records.forEach(message => {

        const twiml = new VoiceResponse()
        twiml.say(`Hi ${message.body}, thank you for participating in Twilio's workshop!`)
        return twilio.calls.create({
            to: message.from,
            from: twilioNumber,
            twiml: twiml.toString()
        });
    })
}
// callBack();


app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});