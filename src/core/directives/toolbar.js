/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = ['$compile','edSelection', 'edActions', 'edUtils', 'epaaad', function($compile, edSelection, edActions, edUtils, epaaad)
{
    var actions = edActions.list();

    return {
        restrict: 'AE',

        scope: {
            epaaadToolbar : '=',
            content       : '=',
            ttext         : '=',
            visible       : '=',
        },
        template: '<ul class="toolbar"></ul>',

        link: function ($scope, $element, $attrs)
        {
            // what about events?
            $scope.$watch('epaaadToolbar', function(n,o)
            {
                if ( n == true )
                {
                    $element.show();
                }
                else
                    $element.hide();
            });
            $scope.$watch('visible', function(n,o)
            {
                if ( n == true )
                {
                    $element.show();
                }
                else
                    $element.hide();
            });

            var content = angular.element($element[0].getElementsByClassName('content_html'));

            if ( $attrs.buttons )
            {
                actions = angular.extend(actions, $scope.$eval($attrs.buttons));
            }

            var el = angular.element($element[0].getElementsByClassName('toolbar'));
            for ( var i in actions )
            {
                if ( typeof actions[i] == 'function' )
                {
                    if (!$scope[i])
                    {
                        $scope[i] = (function (f)
                        {
                            return function ()
                            {
                                edSelection.restore();
                                epaaad.html.focus();

                                var res = actions[f]($scope); // quick hack to trigger updateHtml before return


                                // @TODO: find out if it's really required
//                                epaaad.utils.updateHtml();

                                return res;
                            }
                        })(i);
                    }
                    el.append('<li><a class="redactor_btn epaaad_btn_'+i+'" ng-click="'+ i +'()"></a></li><li class="redactor_separator"></li>');
                }
                else
                {
                    el.append('<li><a class="redactor_btn epaaad_btn_'+i+'" ng-click="'+ i +'()"></a></li><li class="redactor_separator"></li>');
                }
            }

            $compile(el)($scope);
        }
    }
}];