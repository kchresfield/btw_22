require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;

const verifyServiceSid = process.env.VERIFY_SERVICE_SID;
const bodyParser = require('body-parser')
const twilio = require('twilio')(accountSid, authToken);

const service = twilio.verify.services(verifyServiceSid);

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.post("/btw1", async (req, res) => {
    const phoneNumber = req.body.user.phoneNumber;
    const name = req.body.user.name;
    service.verifications.create({
        to: `+1${phoneNumber}`,
        channel:"sms"
    })
    .then(resp => {
        console.log(resp.status)
        res.send(200, "done")
    })
})

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});