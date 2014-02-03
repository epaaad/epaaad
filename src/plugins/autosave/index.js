/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( app, edUtils )
{
    return {
        events: [ 'update.text' ],

        exec  : function ( event, content, $scope )
        {
            var $injector = angular.injector(['ng']);
            var $timeout  = $injector.get('$timeout');

            if ( $scope.autosave.timer )
                $timeout.cancel($scope.autosave.timer);

            $scope.autosave.timer = $timeout(function()
            {
                var dataObject = {};

                if ( $scope.autosave.key )
                {
                    dataObject[$scope.autosave.key] = content;
                }
                else
                    dataObject.content = content;

    //                        $http.post(scope.autosave.url, dataObject).success(function(res)
    //                        {
    //                            console.log('sent');

                // autosave callback
                if ( $scope.asCallback ) { $scope.asCallback({document: dataObject}); }
    //                        }).error(function(e)
    //                        {
    //                            console.log('error', e);
    //                            console.log(scope.asCallback);
    //                            if ( scope.asCallback ) { scope.asCallback({document: dataObject}); }
    //                        });
            }, ($scope.autosave.time * 1000));
        }
    }
};