/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( app )
{
    app.directive('marker', require('./marker'));

    return {
        events: [ 'start', 'key.press' ],

        exec  : function ( evt, e, $scope, edUtils )
        {
            if ( e === false ) return;

            var r = rangy.getSelection().getRangeAt(0);
            var par = r.startContainer.parentNode;

            $scope.$apply(function()
            {
                $scope.par = par.tagName;
            });

            if ( (!par || (par.tagName != 'MARKER' || par.getAttribute('color') != $scope.markerColor)) && e.keyCode != 13 )
            {
                var marker = '<marker color="'+ ($scope.markerColor || 'pink') +'">&nbsp;</marker>';

                edUtils.pasteHtmlAtCaret(marker, true);
            }
        }
    }
};