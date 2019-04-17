const $panels = document.querySelectorAll('.panel');
let ssA = [1,2,3,4,5,6,7,8,9,10,11];
const idleTime = 10;
let idleCntr = 0;
let ss = true;
let interval;

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
        document.getElementById('p'+z).click();
      }, 2500);
    } else {
      ssA = [1,2,3,4,5,6,7,8,9,10,11];
      slideshow();
    }
  }
}

function toggleOpen() {
  for (i=0;i<$panels.length;i++) {
    if ($panels[i].classList.contains('open') && $panels[i] != this) {
      $panels[i].classList.remove('open');
      $($panels[i]).stop().animate({ opacity: 0.5 }, 2000);
    }
  }
  if (this.classList.contains('open')) {
    this.classList.remove('open');
    $(this).stop().animate({ opacity: 0.5 }, 2000);
  } else {
    this.classList.add('open');
    $(this).stop().animate({ opacity: 1 }, 1000);
  }
}

function checkIdle() {
  idleCntr += 1;
  if (idleCntr >= idleTime) {
    ss = true;
  }
}

onLoad();
window.setInterval(checkIdle, 1000);
document.onmousemove = function() { 
  ss = false;
  idleCntr = 0;
};
$panels.forEach(panel => panel.addEventListener('click', toggleOpen));

$(function() {
  $("body").hide().delay(500).fadeIn(1000);
  $(".header").hide().delay(1500).fadeIn(1000);
  $("h1").click(function(e) {
    $("body").fadeOut(1000);
    setTimeout(function() {
      $("body").fadeIn(1000);
      $(".header").hide().delay(1000).fadeIn(1000);
    }, 2000);
  });
  $(".panel").hover(function(e) {
    if (!this.classList.contains("open")) {
      $(this).stop().animate({
        opacity: e.type=="mouseenter" ? 1 : 0.6
      }, 250);
    }
  });
});