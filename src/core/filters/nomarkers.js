/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = [function()
{
    return function(input)
    {
        console.log(' >>> ', input);

        return input.replace(/<\/?marker[^>]*?>/g, '');
    }
}];