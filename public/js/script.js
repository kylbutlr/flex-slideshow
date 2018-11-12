var ssA = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const idleTime = 10;
var idleCntr = 0;
var ss = true;
var interval;
const $panels = document.querySelectorAll('.panel');

function onLoad() {
    interval = setInterval(slideshow, 4000);
}

function slideshow() {
    if (ss == true) {
        if (ssA.length > 0) {
            let i = Math.floor(Math.random() * Math.floor(ssA.length));
            let z = ssA[i];
            ssA.splice(i, 1);
            document.getElementById('p'+z).click();
            setTimeout( function() {
                document.getElementById('p'+z).click()
            }, 2500);
        }
        else {
            ssA = [1,2,3,4,5,6,7,8,9,10,11,12,13];
            slideshow();
        }
    };
}

function toggleOpen() {
    for (i=0;i<$panels.length;i++) {
        if ($panels[i].classList.contains('open') && $panels[i] != this) {
            $panels[i].classList.toggle('open');
        }
    };
    this.classList.toggle('open');
}

function checkIdle() {
    idleCntr += 1;
    if (idleCntr >= idleTime) {
        ss = true;
    }
    if (ss === true) {
        for (i=0;i<$panels.length;i++) {
            $panels[i].classList.add("hover-scale");
        }
    }
    else if (ss === false) {
        for (i=0;i<$panels.length;i++) {
            $panels[i].classList.remove("hover-scale");
        }
    }
}

onLoad();
window.setInterval(checkIdle, 1000);
document.onmousemove = function() { ss = false; idleCntr = 0; }
$panels.forEach(panel => panel.addEventListener('click', toggleOpen));

$(function() {
    $(".header-div").hide().delay(500).fadeIn(1000)
})