/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( app )
{
    return {
        events: [ 'key.press' ],

        exec  : function ( event, e, $scope )
        {
            if ( !$scope.chars ) $scope.chars = [];

            // @TODO: better logic of course ;-)
            if ( e.keyCode != 32 && // space
                e.keyCode != 13 && // enter
                e.keyCode != 46 && // delete
                e.keyCode != 37 && // left arrow
                e.keyCode != 38 && // arrow up
                e.keyCode != 39 && // arrow right
                e.keyCode != 40 && // arrow down
                e.keyCode != 8 )   // backspace
            {
                $scope.chars.push(String.fromCharCode(e.keyCode));
            }
            else
            if ( $scope.chars.length >= 2 )
            {
                if ( typeof $scope.onword !== 'undefined' )
                {
                    $scope.onword({word: $scope.chars.join('')});
                    $scope.chars = [];
                }
            }
            else
            {
                // console.log('JUNK:', scope.chars.join(''));
                $scope.chars = [];
            }
        }
    }
};