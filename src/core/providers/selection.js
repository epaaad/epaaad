/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

var rangy  = require('epaaad-rangy');

module.exports = [function selection ()
{
    rangy.init();

    // @TODO: code below was implemented before i have vounf rangy lib
    // it would be nice to convert it to use rangy, but for now
    // everything works veery well so i'm putting low priority on it
    //
    var isInFocus = false;
    var savedRange;

    var saveSelection = function ( )
    {
        if(window.getSelection)//non IE Browsers
        {
            savedRange = window.getSelection().getRangeAt(0);
        }
        else if(document.selection)//IE
        {
            savedRange = document.selection.createRange();
        }
    };

    var restoreSelection = function ( )
    {
        isInFocus = true;
        if (savedRange != null)
        {
            if (window.getSelection)//non IE and there is already a selection
            {
                var s = window.getSelection();
                if (s.rangeCount > 0)
                    s.removeAllRanges();
                s.addRange(savedRange);
            }
            else if (document.createRange)//non IE and no selection
            {
                window.getSelection().addRange(savedRange);
            }
            else if (document.selection)//IE
            {
                savedRange.select();
            }
        }
    };

    var cancelEvent = function ( e )
    {
        if (isInFocus == false && savedRange != null) {
            if (e && e.preventDefault) {
                e.stopPropagation(); // DOM style (return false doesn't always work in FF)
                e.preventDefault();
            }
            else {
                window.event.cancelBubble = true;//IE stopPropagation
            }

            restoreSelection();
            return false; // false = IE style
        }
    };

    this.$get = function ()
    {
        return {

            rangy   : rangy,

            save    : saveSelection,
            restore : restoreSelection,
            cancel  : cancelEvent,

            blur    : function ( )
            {
                isInFocus = false;
            }
        }
    }
}];