var domready = require('domready');

domready(function ()
{
    var app  = require('./app');
    var main = require('./app/controller');

    app.controller('MainCtrl', main);

    angular.bootstrap(document.body, [app.name]);
});