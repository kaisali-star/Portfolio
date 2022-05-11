const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll('.images img ');


const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger")

const el = document.querySelector("#home");

el.addEventListener("mousemove", (e) => {
  el.style.setProperty('--scale', e.offsetX /el.clientHeight /10 + 2 );
  el.style.setProperty('--x', -e.offsetX /el.clientHeight*10 - 50 + '%');
  el.style.setProperty('--y', -e.offsetY/el.clientWidth*10 -50+ '%');
});



window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;
  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

/* _______________________ Sticky Navbar __________________________ */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);

/* _______________________ scroll Reveal __________________________ */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});
sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* _______________________ skills Progress Bar Animation __________________________ */

function hasReached(el) {
  if(!el) return
  if (el.getBoundingClientRect().y <= -580 || null) {
    return true;
  } else {
    return false;
  }
  // let topPosition = el.getBoundingClientRect().top;
  // if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  // return false;
}

let skillsPlayed = false;
function skillsCounter() {
  if (!hasReached(first_skill)) return;
  skillsPlayed = true;
  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);
    progress_bars[i].style.setProperty("--target", strokeValue);
    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });
  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

/* _______________________ Service Counter Reveal __________________________ */

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counters.forEach((ctr) => {
    let target = +ctr.dataset.target;

    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}

/* _______________________ Portfolio Flter animation  __________________________ */

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* _______________________ Modal pup up animation  __________________________ */
let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  })
);


modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});


prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = images.length-1;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
});
next_btn.addEventListener("click", () => {
  if (currentIndex === images.length-1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
});


function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

/* _______________________  animation  __________________________ */

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* _______________________  Change active link on scroll  __________________________ */

function activeLink() {
  let sections = document.querySelectorAll("section[id");
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);
  let curreSectionID = passedSections.at(-1).id;
  links.forEach((l) => l.classList.remove("active"));
  links[curreSectionID].classList.add("active");
}
activeLink();

/* _______________________ toggle btn  __________________________ */

let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);
function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("fa-moon","fa-sun");
        localStorage.setItem("dark",1)
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("fa-sun","fa-moon");
        localStorage.setItem("dark",0)

    }
}

toggle_btn.addEventListener("click",()=>{
    changeTheme(!document.body.classList.contains("dark"));
})



/* _______________________ Open & close Navbar   __________________________ */

hamburger.addEventListener("click" ,()=>{
    document.body.classList.toggle("open")
    document.body.classList.toggle("stopScrolling")
});
links.forEach(link=>link.addEventListener("click",()=>{
    document.body.classList.remove("open")
    document.body.classList.remove("stopScrolling")
}))


// animation 
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};