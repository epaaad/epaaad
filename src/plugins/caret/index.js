/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( app )
{
    app.directive('caret', require('./caret'));

    return {
        events: [ 'key.down', 'key.up', 'mouse.up' ],

        exec  : function ( evt, e, $scope, edUtils )
        {
            $scope.caret = edUtils.caret.position();
            console.log(evt, edUtils.caret.position());
        }
    }
};