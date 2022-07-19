require('dotenv').config();

// Required Libraries for NodeJS
const express = require('express');
const app = express();
const port = 3000;

// Access the Account SID and Authorization Token from the .env file. Credentials can be found in the Twilio console.
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;
const verifyServiceSid = process.env.VERIFY_SERVICE_SID;

// Required modules from the Twilio library
const twilio = require('twilio')(accountSid, authToken);
const service = twilio.verify.services(verifyServiceSid);

// NodeJS middleware
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100'); // accepts request from (locally running) client
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Endpoint used for sending authorization code to customer
app.post("/send2FA", async (req, res) => {
    const phoneNumber = req.body.user.phoneNumber;
    const name = req.body.user.name;
    service.verifications.create({
        to: `+1${phoneNumber}`,
        channel:"sms"
    })
    .then(resp => {
        console.log(resp.status)
        res.status(200).send("verification code sent")
    })
})

// Endpoint used to verify entered verification code
app.post("/check2FA", async (req, res) => {
    service.verificationChecks.create({
        to: `+1${req.body.data.phoneNumber}`, 
        code: req.body.data.code
    })
    .then(verification_check => {
        res.status(200).send(verification_check)
    });
})

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});