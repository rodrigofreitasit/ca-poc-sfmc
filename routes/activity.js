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
        console.log("encoded: ",JSON.stringify(req.body))
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            var decodedArgs = decoded.inArguments[0];
            // console.log('inArguments', JSON.stringify(decoded.inArguments));
            // console.log('decodedArgs', JSON.stringify(decodedArgs));

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'authorization key'
            }

            const endpoint = 'https://337fd80b6bcbda91f5fef78165e7dc30.m.pipedream.net'

                axios.post(endpoint, decodedArgs, { headers: headers }).then((res) => {
                    console.log(`Success`);
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