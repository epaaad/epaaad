var shoe  = require('shoe');
var dnode = require('dnode');
var sync  = require('epaaad-sync');

module.exports = ['$scope','$sce', '$compile', '$timeout', 'edSelection', function($scope, $sce, $compile, $timeout, edSelection)
{
    $scope.content1  = '';
    $scope.content2  = '';
    $scope.hashtags  = [];
    $scope.usernames = [];
    $scope.markers   = false;
    $scope.color     = '';

    $scope.toolbarState = false;

    $scope.toggleToolbar = function ( )
    {
        $scope.toolbarState = ( $scope.toolbarState === false ) ? true : false;
    };

    var stream = shoe('/dnode');
    var remote = false;

    var d = dnode(function()
    {
        this.sync = function ( data )
        {
            // @FIX: this one should be distincted on the server side
            //
            if ( window.location.pathname !== data.document ) return;

            $scope.$apply(function()
            {
                edSelection.save();
                $scope.content1 = sync.recv($scope.content1, data.data);
                edSelection.restore();
            });
        };
    });
    d.on('remote', function (r)
    {
        r.document(window.location.pathname, function(doc, color)
        {
            $scope.$apply(function()
            {
                edSelection.save();
                // sync.recv needs to be called always when document is going IN and OUT of client browser.
                $scope.content1 = sync.recv(doc);
                $scope.color    = color;
                edSelection.restore();
            });
        });

        remote = r;
    });
    d.pipe(stream).pipe(d);

    $scope.save = function ( doc )
    {
        return;

        remote.autosave(window.location.pathname, sync.send(doc.data), function()
        {
            console.log('saved?');
        });
    };

    // send patches after each keyup
    $scope.stream = function ( doc )
    {
        remote.autosave(window.location.pathname, sync.send(doc));
    };

    $scope.toggleMarkers = function ()
    {
        $scope.markers = ( $scope.markers === false ) ? true : false;
        $scope.$broadcast('epaaad.markers', $scope.markers);
    };

    $scope.previewHtml= function ( variable )
    {
        return $sce.trustAsHtml($scope[variable].replace(/<\/?marker[^>]*?>/g, ''));
    };

    // guest what, it was working before refactoring, i'm leaving this to remember that usecase
    $scope.buttonsList = {
        test: { title: 'test', action: function ( selection )
        {
            // selection.insert('text') or selection.insert(domNode) - for html
            newNode = document.createElement("p");
            newNode.appendChild(document.createTextNode('test button ;-)'));
            selection.range.insertNode(newNode);
        }},
        clear: { title: 'clear', action: function ( selection )
        {
            console.log('clear');
            selection.clear();
        }},
        mark: { title: 'mark', action: function ( selection )
        {
            selection.mark();
        }}
    };

    $scope.catchWord = function ( word )
    {
        if ( word.indexOf('#') === 0 ) { $scope.hashtags.push(word.replace('#','')); }
        if ( word.indexOf('@') === 0 ) { $scope.usernames.push(word.replace('@','')); }

        // ;-)
    };
}];
