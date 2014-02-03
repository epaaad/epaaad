/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function events ()
{
    this.$get = ['$compile', 'edSelection', 'edPlugins', 'edUtils', function ( $compile, edSelection, edPlugins, edUtils )
    {
        var eventsWrapper = function ( callback )
        {
            var scope = edUtils.getScope();
            var el = scope.content;

            el.bind('focus', function(e)
            {
                edSelection.restore();
            });
            el.bind('blur', function(e)
            {
                edSelection.blur();
//                console.log(getCaretCharacterOffsetWithin(e.currentTarget));
            });
            el.bind('keypress', function(e)
            {
//                document.execCommand('formatBlock', false, 'test');
//                document.execCommand("removeFormat", false, "foreColor");
//                document.execCommand("BackColor", false, "yellow/*test*/");
//                document.execCommand("hiliteColor", false, "pink");

                edPlugins.exec('key.press', e, scope, edUtils);

//                scope.wordsCollector(e);
            });
            el.bind('keydown', function(e) // tab will not work with keypress
            {
                edPlugins.exec('key.down', e, scope, edUtils);

                if ( e.keyCode == 9 )
                {
                    e.preventDefault();

//                    var tabHtml = "<span style='border: 1px solid gray; padding: 3px; font-size: 9px;'>TAB</span>&nbsp;";
//                    scope.updateHtml(this.innerHTML + tabHtml);

                    if (e.shiftKey === false)
                        document.execCommand('indent', false, null);
                    else
                        document.execCommand('outdent', false, null);

                    return false;
                }
            });
            el.bind('keyup', function(e)
            {
                edPlugins.exec('key.up', e, scope, edUtils);

                if ( typeof scope.keyup !== 'undefined' )
                {
                    // @TODO: actually, something like epaaad.directives = OFF
                    // would be much better idea, since we don't want to save
                    // html with stuff from directives into backend
                    //
                    scope.$broadcast('epaaad.markers', true);

                    // @FIX: it was pretty obvious that i'll hit in timing issues here
                    //
//                    setTimeout(function()
//                    {
                        // this one should fire a callback so I could broadcast epaaad.makers from there
                        // but! long delay inside of .keyup handler will couse weird UI behaviour
                        // (like flickering things which are using events BUS)
                        //
                        // currently example app is using .keyup to 'stream' diffs to the server
                        // but this way it screws with epaaad internals beacouse it affects timing
                        // after which markers plugin should turn them back ON
                        //
                        // btw. it would be nice if 'events' had no idea about particular plugins
                        // (like markers in this case)
                        //
                        scope.keyup({event: e, content: scope.text});
//                    },5);

//                    setTimeout(function()
//                    {
                        scope.$broadcast('epaaad.markers', false);
//                    },10);
                }

//                console.log(getCaretCharacterOffsetWithin(e.currentTarget));
                edSelection.save();
            });
            el.bind('click', function(e)
            {
                edPlugins.exec('mouse.click', e, scope, edUtils);

                return edSelection.cancel(e);
            });
            el.bind('mousedown', function(e)
            {
                edPlugins.exec('mouse.down', e, scope, edUtils);

                var r = rangy.getSelection().getRangeAt(0);
                var par = r.startContainer.parentNode;
                scope.par = par.tagName;
//                console.log(par);

                return edSelection.cancel(e);
            });
            el.bind('mouseup', function(e)
            {
                edPlugins.exec('mouse.up', e, scope, edUtils);

//                console.log(getCaretCharacterOffsetWithin(e.currentTarget));
                edSelection.save();
                scope.$apply();
            });

            el.bind('dragover', function(e)
            {
//                console.log('dragover');
                edPlugins.exec('view.dragover', e, scope, edUtils);
            });
            el.bind('dragenter', function(e)
            {
//                console.log('dragenter');
                edPlugins.exec('view.dragenter', e, scope, edUtils);
            });
            el.bind('drop', function(e)
            {
//                console.log('drop');
                edPlugins.exec('view.drop', e, scope, edUtils);
            });
        };

        return {

            wrap: eventsWrapper
        }
    }]
};