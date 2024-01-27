var body = document.querySelector("body");
body.classList.add("hiding-scrollbar");

// PAGE RELOAD or REFRESH , MOVE BACK TO THE TOP
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// TO DISABLE SCROLLING DURING LOAFUNG START
// hey
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
    // if any scroll is attempted,
    // set this to the previous value
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}

// TO ENABLE SCROLLING AFTER AFTER ALL THE ANIMATIONS WERE DONE
function enableScroll() {
  window.onscroll = function () {};
}

// RESPONSIBLE FOR IMPLEMENTATION OF LOCOMOTIVE WITH SCROLL TRIGGER
function locomotiveJS() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loader() {
  // creates a timeline to perform a sequence of actions
  var tl = gsap.timeline({
    onComplete: function () {
      enableScroll();
      body.classList.remove("hiding-scrollbar");
    },
  });

  // Loader text animation
  tl.from(".loader .line h1 ", {
    y: 150,
    stagger: 0.25,
    delay: 0.4,
    duration: 0.75,
  });

  // loader timer
  tl.from(".loader .timer-container ", {
    opacity: 0,
    onStart: function () {
      var timer = document.querySelector("#timer");

      var count = 0;
      var int = setInterval(function () {
        count++;
        if (count === 100) {
          clearInterval(int);
        }

        timer.textContent = `${count}`;
      }, 25);
    },
  });

  // Starts the Now animation after timer animation start
  tl.to(".loader .line #now ", {
    animationName: "nowanime",
  });

  tl.from(".loader .please-wait h6", {
    opacity: 0,
  });

  tl.to(".loader", {
    delay: 1.5,
    opacity: 0,
    duration: 0.5,
  });

  tl.from(".page1 ", {
    delay: 0.1,
    y: 1600,
    duration: 0.5,
    opacity: 1,
    ease: Power4,
  });

  tl.to(".loader", {
    display: "none",
  });
  tl.from("nav", { opacity: 0, duration: 0.1 });

  tl.from(".hero  h1 , .hero  h2 ", {
    y: 100,
    stagger: 0.2,
  });

  tl.from(
    "#hero1 , #video-container",
    {
      opacity: 0,
    },
    "+=.5"
  );
}

function cursorAnimation() {
  // Shery.mouseFollower({
  //   skew: true,
  //   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  //   duration: 1,
  // });

  document.addEventListener("mousemove", function (e) {
    // console.log(e);
    gsap.to("#cursor", {
      x: e.x,
      y: e.y,
    });
  });

  Shery.makeMagnet(".nav-part2 h4", {});

  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      console.log(dets);
      gsap.to("#cursor", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        x: dets.x - 1000,
        y: dets.y - 100,
      });
    });
  });
  videoContainer.addEventListener("mouseout", function () {
    gsap.to("#cursor", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      x: "70%",
      y: "-15%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });

  document.addEventListener("mousemove", function (e) {
    gsap.to("#special-cursor", {
      x: e.x,
      y: e.y,
    });
  });

  document
    .querySelector("#hero3 #onlyfor3container ")
    .addEventListener("mouseenter", function (e) {
      document.querySelector("#special-cursor").style.transform =
        "translate(-50%,-50%)";
      gsap.to("#special-cursor", {
        opacity: 0.7,
      });
    });

  document
    .querySelector("#hero3 #onlyfor3container ")
    .addEventListener("mouseleave", function (e) {
      gsap.to("#special-cursor", {
        opacity: 0,
      });
    });
}

function gooyeffect() {
  Shery.imageEffect(".page3 .products .images", {
    style: 6,
    config: {
      noiseDetail: { value: 7.44, range: [0, 100] },
      distortionAmount: { value: 2.98, range: [0, 10] },
      scale: { value: 36.36, range: [0, 100] },
      speed: { value: 0.79, range: [0, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7852760736196319 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 1.07, range: [0, 10] },
      metaball: { value: 0.55, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.1, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 30.53, range: [0, 100] },
    },
    gooey: true,
  });
}

// disableScroll();
loader();
locomotiveJS();
cursorAnimation();
gooyeffect();
// watchvideo();
