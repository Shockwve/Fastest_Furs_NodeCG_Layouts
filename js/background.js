var create_freq = 750;
var pos_update = 2; //small the number, the faster the update
var pos_update_freq = 20;
var left_pos_bounds = 10;
var right_pos_bounds = 1895;
var bottom_pos_bounds = 1080;
var num_highlights_on_screen = 30;
var cur_highlights_on_screen = 0;

//create position
setInterval(function () {
    if ( document.hasFocus() && cur_highlights_on_screen < num_highlights_on_screen) {
        cur_highlights_on_screen += 1;
        var elem = document.createElement("DIV");
        elem.classList.add("background-glow");
        elem.style.left = Math.floor((Math.random() * right_pos_bounds) + left_pos_bounds) + 'px';
        elem.style.top = bottom_pos_bounds + 'px';
        document.body.appendChild(elem);
    }
}, create_freq);

//update position
setInterval(function(){
    if ( document.hasFocus() ) {
        var aniDivs = document.getElementsByClassName("background-glow");
        if (aniDivs.length > 0){
            for (const elem of aniDivs){
                var style = getComputedStyle(elem);
                var eTop = style.getPropertyValue("top").toString();
                var eLeft = style.getPropertyValue("left").toString();
                elem.style.top = (parseInt(eTop.substring(0,eTop.length-2)) - pos_update) + 'px';
            };
        }
    }
}, pos_update_freq);


// Delete divs that go OOBS
setInterval(function(){
    if ( document.hasFocus() ) {     
        var oobDivs = document.getElementsByClassName("background-glow");
        var arrayDivs = [...oobDivs];
        if(arrayDivs.length > 0){
            arrayDivs.forEach(function(elem){
                if (parseInt(elem.style.top.substring(0, elem.style.top.length-2)) <= 0){
                    cur_highlights_on_screen -=1;
                    elem.parentNode.removeChild(elem);
                }
            });
    }
    }
}, 2000);