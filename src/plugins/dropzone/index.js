/**
 * Epaaad
 * @copyright &copy; 2014- Krzysztof Antczak
 * @license: MIT
 * @see http://github.com/epaaad/epaaad
 * @author Krzysztof Antczak
 */

module.exports = function ( app )
{
//    app.directive('zoneIndicator', require('./marker'));

    return {
        events: [ 'view.dragenter', 'view.dragover', 'view.drop' ],

        exec  : function ( evt, e, $scope, edUtils )
        {
            if ( evt == 'view.drop' )
            {
                e.stopPropagation();
                e.preventDefault();

                var dt    = e.originalEvent.dataTransfer;
                var files = dt.files;

                for (var i=0; i<files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();

                    //attach event handlers here...
                    reader.onload = (function(theFile)
                    {
                        return function(e) {

                            var img = ['<img class="thumb" src="', e.target.result ,'" title="', escape(theFile.name), '"/>'].join('');

                            edUtils.pasteHtmlAtCaret(img, true);
                        };
                    })(file);

                    reader.readAsDataURL(file);
                }

                return false;
            }
        }
    }
};