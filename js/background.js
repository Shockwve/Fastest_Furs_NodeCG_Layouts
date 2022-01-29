var create_freq = 2250;
var pos_update = 2; //small the number, the faster the update
var pos_update_freq = 20;
var left_pos_bounds = 10;
var right_pos_bounds = 1895;
var bottom_pos_bounds = 1080;

//create position
setInterval(function () {
    if ( document.hasFocus() ) {
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
        oobDivs.forEach(function(elem){
            if (elem.style.top <= 0){
                document.parentNode.removeChild(elem);
            }
        });
    }
}, 2000);