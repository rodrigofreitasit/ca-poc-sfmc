'use strict';

var express = require('express');
var path = require('path');
// var activity = require('./activity');

var app = express();

exports.index = function (req, res) {
    console.log('index request!');
    console.log('path: ', path.join(__dirname, '../public'))

    // app.use(express.static(path.join(__dirname, '../public')));
    // if (!req.session.token) {
    //     res.render('index', {
    //         title: 'Unauthenticated',
    //         errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
    //     });
    // } else {
    //     res.render('index', {
    //         title: 'Journey Builder Activity',
    //         results: activity.logExecuteData,
    //     });
    // }
};

exports.login = function (req, res) {
    console.log('req.body: ', req.body);
    res.redirect('/');
};

exports.logout = function (req, res) {
    req.session.token = '';
};