'use strict';

var QueryString = (function(){
    // @param query_string Usually location.search value.
    var QueryString = function(query_string){
        this._raw_query_string = query_string;

        var query_string_without_query_string = query_string.substring(1);
        var parameters = query_string_without_query_string.split('&');

        this._dict = {};

        for(var i=0;i<parameters.length;i++){
            var kvs = parameters[i].split('=');
            var key = kvs[0];
            var value = kvs[1];
            this._dict[key] = value;
        }
    }

    var p = QueryString.prototype;

    p.get_colorcode = function(){
        var colorcode = '#FFFFFF';
        for(var k in this._dict){
            colorcode = k;
            break;
        }
        return colorcode;
    }

    return QueryString;
})();
var raw_querystring = window.location.search;
var qs = new QueryString(raw_querystring);

const K = {
    'TAB'    : 9,
    'ENTER'  : 13,
    'ESC'    : 27,
};
const PREVIEW_TARGET_SELECTOR = '#preview_area';
const KEYWATCH_TARGET_SELECTOR = 'body';

function change_color(maybe_colorcode_from_input){
    var colorcode = maybe_colorcode_from_input.toLowerCase().trim();

    if(colorcode.indexOf(',') != -1 && colorcode.indexOf('rgb') == -1){
        // 255, 255, 0
        colorcode = 'rgb(' + colorcode + ')';
    }else if(colorcode.indexOf(' ') != -1 && colorcode.indexOf('rgb') == -1){
        // 255 255 0
        colorcode = 'rgb(' + colorcode + ')';
        // At most, replace count is two because should be 'x y z'.
        colorcode = colorcode.replace(' ', ',').replace(' ', ',');
    }

    // Supported string formats are 'ffff00' or 'rgb(255,255,0)' only.
    $(PREVIEW_TARGET_SELECTOR).css('background-color', colorcode);
}

$(function(){
    const SELECTOR_INPUT = '#current_colorcode';
    var colorcode_from_qs = qs.get_colorcode();

    $(SELECTOR_INPUT).keyup(function(){
        var maybe_colorcode_from_input = $(this).val();
        change_color(maybe_colorcode_from_input);
    });

    $(KEYWATCH_TARGET_SELECTOR).keydown(function(e){
        const keycode = e.keyCode;
        const mod_alt = e.altKey;
        const mod_ctrl = e.ctrlKey;
        const mod_shift = e.shiftKey;

        if(keycode==K.ESC){
            $(SELECTOR_INPUT).focus().select();
            return;
        }
    });

    console.log(colorcode_from_qs)
    $(SELECTOR_INPUT).val(colorcode_from_qs).keyup();
});
