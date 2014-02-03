/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = ['$compile','$timeout','$http', '$injector','epaaad','edSelection', 'edEvents', 'edPlugins', 'edUtils', function epaaad ($compile, $timeout, $http, $injector, epaaad, edSelection, edEvents, edPlugins, edUtils)
{
    return {
        restrict: 'E',
        template: '<div class="epaaadWrapper">{{ caret }}<div class="epaaad" ng-class="{html: view == \'html\', text: view == \'text\'}"><div class="plugins"></div><div class="content_html" contentEditable="true" ng-bind-html-unsafe="html" ng-hide="view!=\'html\'"></div><textarea class="content_text" ng-model="text" ng-hide="view!=\'text\'"></textarea></div></div>',
        replace: true,
        // terminal: true,
        scope: {
            onword      : '&',
            keyup       : '&',
            asCallback  : '&',
            markerColor : '=',
            toolbar     : '='
        },
        require: '?ngModel',

        link: function postLink(scope, iElement, iAttrs, controller)
        {
            edPlugins.exec('start', false, scope, edUtils);

            scope.content = angular.element(iElement[0].getElementsByClassName('content_html'));
            scope.ttext   = angular.element(iElement[0].getElementsByClassName('content_text'));

            epaaad.utils.setScope      (scope     );
            epaaad.utils.setController (controller);

            // enable css styles instead of html tags (like font-weight instead of <b>)
            // it creates to much mess atm
            //
            // document.execCommand("styleWithCSS", null, true);

            epaaad.html.focus();

            if ( iAttrs.toolbar && ( iAttrs.toolbar === 'true' || typeof scope.toolbar !== 'undefined' ) )
            {
                var plugins = angular.element(iElement[0].getElementsByClassName('plugins'));
                var tbar    = angular.element('<epaaad-toolbar content="content" ttext="ttext" visible="toolbar"></epaaad-toolbar>');

                plugins.append(tbar);

                if ( typeof scope.toolbar !== 'undefined' )
                {
                    scope.$watch('toolbar', function (n,o)
                    {
                        tbar.attr('visible', n);

                        $compile(plugins)(scope);
                    });
                }
            }

            // te wszystkie akcje trzeba jakos przekazac do toolbara powyzej - w ogole trzeba?
            // if ( iAttrs.buttons )
            // {
            //     actions = angular.extend(actions, $scope.$eval($attrs.buttons));
            // }

            if ( iAttrs.autosave && typeof iAttrs.autosave == 'string' )
            {
                scope.autosave = scope.$eval(iAttrs.autosave);
            }

            if ( iAttrs.onword && typeof iAttrs.onword == 'string' )
            {
                // console.log('on word setup!', iAttrs.onword);
            }

            // view -> model
            edEvents.wrap(function(event)
            {
                console.log(event);
            });

            // view -> model
            scope.content.bind('DOMSubtreeModified', function(e)
            {
                // @TODO: perhaps something like epaaad.utils.text.sync() would be better here?
                epaaad.utils.updateText(scope.content[0].innerHTML);
            });

            // model -> view
            controller.$render = function()
            {
                scope.text = controller.$viewValue;
                scope.content.html(controller.$viewValue);

                // we need to compile directives inside of content
                $compile(scope.content)(scope);
            };

            //
            scope.$watch('text', function(n,o)
            {
                controller.$setViewValue(n);
            });

            $compile(iElement)(scope);
        }
    }
}];