/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

var Utils = function ( )
{

};

Utils.prototype.$get = ['$compile', '$timeout', 'edPlugins', function ($compile, $timeout, edPlugins)
{
    var scope = false,
        controller = false;

    return {

        setScope: function ( sc )
        {
            scope = sc;
            scope.view = 'html';
        },

        setController: function ( ctrl )
        {
            controller = ctrl;
        },

        getScope: function ( )
        {
            return scope;
        },

        view: {

            get: function ()
            {
                return scope.view;
            },

            html: function ()
            {
                scope.view = 'html';
            },

            text: function ()
            {
                scope.view = 'text';
            },

            toggle: function ()
            {
                scope.view = ( scope.view === 'html' ) ? 'text' : 'html';
            }
        },

        updateHtml: function (content)
        {
            $timeout(function()
            {
                if ( typeof content == 'undefined' )
                {
                    content = scope.content.html();
                }
                else
                {
                    scope.content.html(content);

                    // we need to compile directives inside of content
                    $compile(scope.content)(scope);
                }

                scope.text = content;
                controller.$setViewValue(content);
            });

            edPlugins.exec('update.html', content, scope, this);
        },

        updateText: function (content)
        {
            $timeout(function()
            {
                scope.text = content;
                controller.$setViewValue(scope.text);
            });

            // plugin
            // @TODO: pass iAttrs to plugins, to be able to detect this stuff on plugin level
            if ( scope.autosave )
            {

            }

            edPlugins.exec('update.text', content, scope, this);
        },

        caret: {

            position: function getCaretCharacterOffsetWithin()
            {
                var element = scope.content[0];

                var caretOffset = 0;
                if (typeof window.getSelection != "undefined") {
                    var range = window.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
                    var textRange = document.selection.createRange();
                    var preCaretTextRange = document.body.createTextRange();
                    preCaretTextRange.moveToElementText(element);
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    caretOffset = preCaretTextRange.text.length;
                }
                return caretOffset;
            }
        },

        pasteHtmlAtCaret: function (html, selectPastedContent, startSel, endSel)
        {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    var el = document.createElement("p");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    var firstChild = el.firstChild;

                    while ( (node = el.firstChild) ) {
                        lastNode = frag.appendChild(node);
                    }

                    var firstNode = frag.firstChild;

//                    console.log('compilation?', $scope);
                    $compile(frag)(scope);
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
        //                            range.setStartAfter(lastNode);
                        range.setStartAfter(firstChild.firstChild);
                        if (selectPastedContent) {
        //                                range.setStartBefore(firstNode);
                            range.setStartBefore(firstChild.firstChild);
                        } else {
                            range.collapse(true);
                        }
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if ( (sel = document.selection) && sel.type != "Control") {
                // IE < 9
                var originalRange = sel.createRange();
                originalRange.collapse(true);
                sel.createRange().pasteHTML(html);
                if (selectPastedContent) {
                    range = sel.createRange();
                    range.setEndPoint("StartToStart", originalRange);
                    range.select();
                }
            }
        }
    };
}];

module.exports = Utils;