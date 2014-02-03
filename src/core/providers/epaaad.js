/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

var Epaaad = function ( )
{

};

Epaaad.prototype.$get = ['$compile', 'edSelection', 'edEvents', 'edPlugins', 'edUtils', function ($compile, edSelection, edEvents, edPlugins, edUtils)
{
    return {
        selection: edSelection,
        events   : edEvents,
        plugins  : edPlugins,
        utils    : edUtils,

        html     : {

            focus: function ()
            {
                edUtils.getScope().content[0].focus();
            }
        },

        text     : {

            focus: function ()
            {
                edUtils.getScope().ttext[0].focus();
            }
        }
    }
}];

module.exports = Epaaad;