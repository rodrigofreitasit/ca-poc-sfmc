'use strict';

var activity = require('./activity');

export function index(req, res) {
    console.log('req: ', req)
    console.log('index request!');

    if (!req.session.token) {
        res.render('index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render('index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
}

export function login(req, res) {
    console.log('req.body: ', req.body);
    res.redirect('/');
}

export function logout(req, res) {
    req.session.token = '';
}