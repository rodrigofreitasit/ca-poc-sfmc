'use strict';

const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
const util = require('util');
const axios = require('axios');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
}

exports.edit = function (req, res) {
    console.log('edit request');
    // logData(req);
    res.status(200).send('Edit');
};

exports.save = function (req, res) {
    console.log('save request');
    // logData(req);
    res.status(200).send('Save');
};

exports.execute = function (req, res) {
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
        console.log("encoded: ", JSON.stringify(req.body))
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            var decodedArgs = decoded.inArguments[0];
            // console.log('inArguments', JSON.stringify(decoded.inArguments));
            // console.log('decodedArgs', JSON.stringify(decodedArgs));


            //////////start//////

            ////////end///////////
            const headers = {
                'Content-Type': 'application/json',
                'X-API-TOKEN': process.env.SECRET_API
            }

            const endpoint = 'https://api.zenvia.com/v2/channels/whatsapp/message'

            axios.post(endpoint, {
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
            }, {
                headers: headers
            }).then((res) => {
                console.log(`Success ${res}`);
            }).catch((err) => {
                console.error(`ERROR ${err}`)
            })

            res.status(200).send('Execute')
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};

exports.publish = function (req, res) {
    console.log('publish request');
    // logData(req);
    res.status(200).send('Publish')
};

exports.validate = function (req, res) {
    console.log('validate request');
    // logData(req);
    res.status(200).send('Validate')
};