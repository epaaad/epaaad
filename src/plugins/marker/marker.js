/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function marker ()
{
    var st = false;

    return {

        restrict: 'E',

        link: function ($scope, $element, $attrs)
        {
            if ( !st )
                $element.css('background-color', $attrs.color || 'pink');

            $scope.$on('epaaad.markers', function(e, state)
            {
                st = state;

                if ( !state )
                    $element.css('background-color', $attrs.color || 'pink');
                else
                {
                    $element.removeAttr('style');
//                    $element.css('background-color', false);
                }
            });
        }
    };
};