require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;

const VoiceResponse = require('twilio').twiml.VoiceResponse;
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID;
const twilio = require('twilio')(accountSid, authToken);

// call everyone back from their area code
app.post("/btw2", async (req, res) => {
    let records = await twilio.messages.list({to: twilioNumber});
    let names = records.forEach(e => {
        [e.body, e.from]
        const twiml = new VoiceResponse()
        twiml.say(`Hi ${e.body} thank you for attending Twilio''s workshop!`);
        twilio.calls.create({
            to: e.from,
            messagingServiceSid,
            twiml:twiml.toString()
        }).then(call => {
            console.log(call.sid)
        });
    })
})




app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});