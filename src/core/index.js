/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( epaaad )
{
    epaaad.directive ('epaaadToolbar', require('./directives/toolbar' ));
    epaaad.directive ('epaaad'       , require('./directives/epaaad'  ));

    epaaad.service   ('edActions'    , require('./services/actions'   ));

    epaaad.provider  ('edUtils'      , require('./providers/utils'    ));
    epaaad.provider  ('edSelection'  , require('./providers/selection'));
    epaaad.provider  ('edEvents'     , require('./providers/events'   ));

    epaaad.provider  ('epaaad'       , require('./providers/epaaad'   ));

    return epaaad;
};