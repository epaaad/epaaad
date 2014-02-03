/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

require('./plugins');

var epaaad   = angular.module('epaaad', ['edPlugins']);

var edCore   = require('./core'            )(epaaad);

var autosave = require('./plugins/autosave')(epaaad);
var marker   = require('./plugins/marker'  )(epaaad);
var words    = require('./plugins/words'   )(epaaad);
var dropzone = require('./plugins/dropzone')(epaaad);
var caret    = require('./plugins/caret'   )(epaaad);

epaaad.run(['edPlugins', function(edPlugins)
{
    edPlugins.register('autosave', autosave); // there should be some better way to do that
    edPlugins.register('marker'  , marker  ); // there should be some better way to do that
    edPlugins.register('words'   , words   ); // there should be some better way to do that
    edPlugins.register('dropzone', dropzone); // there should be some better way to do that
    edPlugins.register('caret'   , caret   ); // there should be some better way to do that
}]);

module.exports = epaaad;
