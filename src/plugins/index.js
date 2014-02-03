/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

var edPlugins = angular.module('edPlugins', []);
var plugins   = {};
var Plugin    = function (){};

Plugin.prototype.register = function ( name, obj )
{
    plugins[name] = obj;
};

Plugin.prototype.$get = function (  )
{
    var self = this;

    return {

        exec: function ( )
        {
            for ( var plugin in plugins )
            {
                // fire only if plugin event types are matched with current event
                // or when plugin doesn't have set any .events at all
                //
                if ( plugins[plugin].events && plugins[plugin].events.indexOf(arguments[0]) !== -1 )
                {
//                    console.log(plugin, 'EXEC', arguments[0]);
//                    var $injector = angular.injector(['edPlugins', 'ng']);

                    plugins[plugin].exec.apply(self, arguments);
                }
            }
        },

        register: self.register
    };
};

module.exports = edPlugins.provider('edPlugins', Plugin);