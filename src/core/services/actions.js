/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = ['$timeout', 'edSelection', 'epaaad', function actions ($timeout, edSelection, epaaad)
{
    var actions = {
        source: function ( $scope )
        {
            if ( epaaad.utils.view.get() === 'text' )
            {
                epaaad.utils.updateHtml($scope.text); // update html view after text edit

                $timeout(function()
                {
                    epaaad.selection.restore();
                    epaaad.html.focus();
                });
            }
            else
            {
                $timeout(function()
                {
                    epaaad.selection.restore();
                    epaaad.text.focus();
                });
            }

            epaaad.utils.view.toggle();
        },
        formatting: function ( $scope )
        {
            document.execCommand('bold', false, null);
        },
        bold: function( $scope )
        {
            document.execCommand('bold', false, null);
        },
        italic: function($scope)
        {
            document.execCommand('italic', false, null);
        },
        deleted: function($scope)
        {
            document.execCommand('strikeThrough', false, null);
        },
        unorderedlist: function($scope)
        {
            document.execCommand('insertUnorderedList', false, null);
        },
        orderedlist: function($scope)
        {
            document.execCommand('insertOrderedList', false, null);
        },
        outdent: function($scope)
        {
            document.execCommand('outdent', false, null);
        },
        indent: function($scope)
        {
            document.execCommand('indent', false, null);
        }
    };

    return {

        list: function ( )
        {
            return actions;
        },
        register: function ( action, callback )
        {
            actions[action] = callback;
        }
    }
}];