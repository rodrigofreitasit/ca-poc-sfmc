'use strict';
const express = require('express');
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
const axios = require('axios');

const router = express.Router();

router.post('/journeybuilder/save/', (req, res) => {
    console.log('save request');
    res.status(200).send('Save');
})

router.post('/journeybuilder/execute/', (req, res) => {
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
        // console.log("encoded: ", JSON.stringify(req.body))
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            var decodedArgs = decoded.inArguments[0];

            let data = {
                'from': 'tinted-bird',
                'to': '5511984505745',
                'contents': [{
                    'type': 'template',
                    'templateId': '6ccf46dd-c506-46af-9181-ef69efdc70de',
                    'fields': {
                        'name': decodedArgs.firstName,
                        'productName': decodedArgs.nameProduct,
                        'deliveryDate': '17/08/2022'
                    }
                }]
            };

            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-TOKEN': process.env.SECRET_API
                }
            }

            let sendPostRequest;
            (sendPostRequest = async () => {
                try {
                    const resp = await axios.post('https://api.zenvia.com/v2/channels/whatsapp/messages', data, headers);
                    console.log(`Success: ${JSON.stringify(resp)}`);
                    if (resp.status == 200) {
                        res.status(200).send('Execute')
                    }
                } catch (err) {
                    // Handle Error Here
                    console.error(`Error: ${JSON.stringify(err)}`);
                }
            })();

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
})

router.post('/journeybuilder/publish/', (req, res) => {
    console.log('publish request...');
    res.status(200).send('Publish')
})

router.post('/journeybuilder/validate/', (req, res) => {
    console.log('validate request...');
    res.status(200).send('Validate')
})

router.post('/journeybuilder/stop/', (req, res) => {
    console.log('stop request...');
    res.status(200).send('Stop')
})

module.exports = router;