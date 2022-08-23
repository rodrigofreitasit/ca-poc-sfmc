'use strict';

import {
    join
} from 'path';
const JWT = require(join(__dirname, '..', 'lib', 'jwtDecoder.js'));
import {
    inspect
} from 'util';
import {
    post
} from 'axios';

export let logExecuteData = [];

function logData(req) {
    logExecuteData.push({
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

    console.log("body: " + inspect(req.body));
    console.log("headers: " + inspect(req.headers));
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + inspect(req.params));
    console.log("query: " + inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

export function edit(req, res) {
    console.log('edit request');
    // logData(req);
    res.status(200).send('Edit');
}

export function save(req, res) {
    console.log('save request');
    // logData(req);
    res.status(200).send('Save');
}

export function execute(req, res) {
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
                    const resp = await post('https://api.zenvia.com/v2/channels/whatsapp/messages', data, headers);
                    console.log(`Success: ${resp.data}`);
                    if (resp.status == 200) {
                        res.status(200).send('Execute')
                    }
                } catch (err) {
                    // Handle Error Here
                    console.error(`Error: ${err}`);
                }
            })();

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
}

export function publish(req, res) {
    console.log('publish request...');
    // logData(req);
    res.status(200).send('Publish')
}

export function validate(req, res) {
    console.log('validate request...');
    // logData(req);
    res.status(200).send('Validate')
}