require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio')(accountSid, authToken);
const twilioNumber = provess.env.TWILIO_NUMBER;

// gather information and send out promo code
app.post("/btw1", async (req, res) => {
    const twiml = new MessagingResponse()
    twiml.message('It was nice to meet everyone, here are my contact details: kchresfield@twilio.com');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString())
    let records = await twilio.messages.list({to: twilioNumber});
    let names = records.map(e => [e.body, e.from])
    console.log(names)
})


app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});