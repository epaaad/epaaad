var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

var dnode = require('dnode');
var shoe  = require('shoe');

var sync  = require('epaaad-sync');

app.use(express.static(__dirname + '/public/'));
app.use('/bundle.js', browserify('./client/index.js'));

// to handle /* routes with angular
app.get('*', function(req, res)
{
    res.sendfile(__dirname + '/public/index.html');
});

var server = require('http').createServer(app);

function randomId () {
    var s = '';
    for (var i = 0; i < 4; i++) {
        s += Math.random().toString(16).slice(2);
    }
    return s;
}

var sockets = [];
var docs    = {};
var colors  = ['pink', 'rgb(189, 185, 185)', 'yellow', 'rgb(159, 211, 24)', 'red', 'rgb(85, 211, 235)'];

var sock = shoe(function (stream)
{
    sockets.push(stream);

    var propagate = function ( obj, skipSocket )
    {
        for(var i=0, l=sockets.length; i<l; i++)
        {
            if ( typeof skipSocket !== 'undefined' && sockets[i] == skipSocket ) continue;

//            console.log(sockets[i].remotes);

            sockets[i].remotes.sync(obj, function()
            {
                console.log('callback from client', arguments);
            });
        }
    };

    var getColor = function ( sock )
    {
        var idx = sockets.indexOf(sock);
        return sockets[idx].color;
    };

    var d = dnode(function(client, conn)
    {
        if (!conn.id) conn.id = randomId();
        console.log(sockets.length, 'connected clients');

        this.document = function (doc, next)
        {
            if (!docs[doc]) docs[doc] = 'Empty doc';

            next(docs[doc], getColor(stream));
        };

        this.autosave = function (doc, data, next)
        {
            console.log(doc, data);
            propagate({document: doc, data: data}, stream);

            docs[doc] = sync.recv(docs[doc], data);
            console.log(docs[doc]);

            if ( next )
                next();
        };
    });
    d.on('remote',function(r,s)
    {
        var idx = sockets.indexOf(stream);
        sockets[idx].remotes = r;
        sockets[idx].color = colors[Math.floor(Math.random()*colors.length)];;
    });
    d.on('end', function()
    {
        var idx = sockets.indexOf(stream);

        if ( idx > 0 )
            sockets.splice(1, idx);
        else
        if ( idx == 0 )
            sockets.splice(0, 1);
    });
    d.pipe(stream).pipe(d);
});
sock.install(server, '/dnode');

server.listen(8014);