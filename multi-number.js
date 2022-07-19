require('dotenv').config();

// Required Libraries for NodeJS
const express = require("express");
const app = express();
const port = 3000;

// Access the Account SID and Authorization Token from the .env file. Credentials can be found in the Twilio console.
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER

// Required modules from the Twilio library
const twilio = require('twilio')(accountSid, authToken);
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID;

// Using Twilio messaging services, scale customer interaction with multiple Twilio numbers
const eBlast = async () => {
    let records = await twilio.messages.list({to: twilioNumber});
    records.forEach(e => {
        twilio.messages.create({
            to: e.from,
            messagingServiceSid: messagingServiceSid,
            body: `Hi ${e.body} our website's having a sale! Come shop! Shop Shop Shop Shop`
        });
    })
}

// eBlast()




app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});