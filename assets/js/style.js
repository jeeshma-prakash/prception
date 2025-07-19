fetch("footer.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));

fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("navbar").innerHTML = data));

gsap.registerPlugin(ScrollTrigger, Flip);

const bennet = document.getElementById("hero");
const placeholder = document.getElementById("bennetPlaceholder");
const heroSection = document.querySelector(".hero-section");
const fadeElements = document.querySelectorAll(".hero-fade");
const secondSection = document.getElementById("secondSection");
const subtext = document.getElementById("subtext");

ScrollTrigger.create({
  trigger: ".second-section",
  start: "top center",
  end: "top top",
  scrub: true,
  onUpdate: (self) => {
    if (self.progress > 0 && !bennet.classList.contains("moved")) {
      const state = Flip.getState(bennet);

      fadeElements.forEach((el) => (el.style.opacity = 0));
      placeholder.appendChild(bennet);
      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to(secondSection, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });

      bennet.classList.add("moved");
    } else if (self.progress < 0.1 && bennet.classList.contains("moved")) {
      const state = Flip.getState(bennet);
      heroSection.appendChild(bennet);
      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
      });

      fadeElements.forEach((el) => (el.style.opacity = 1));

      gsap.to(secondSection, {
        opacity: 0,
        y: 100,
        duration: 0.3,
      });

      bennet.classList.remove("moved");
    }
  },
});

// Word carousel
const words = document.querySelectorAll(".carousel-words .word");
let current = 0;
setInterval(() => {
  words[current].classList.remove("active");
  current = (current + 1) % words.length;
  words[current].classList.add("active");
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
  const number2 = document.querySelector(".number_2");
  const number3 = document.querySelector(".number_3");
  const percentageFirst = document.querySelector(".percentage-first span");
  const preloaderWrap = document.querySelector(".preloader-wrap");

  let count = 0;

  let interval = setInterval(() => {
    if (count <= 99) {
      let firstDigit = Math.floor(count / 10);
      let secondDigit = count % 10;

      gsap.to(number2, {
        y: `-${firstDigit * 100}%`,
        duration: 0.3,
        ease: "power1.out",
      });

      gsap.to(number3, {
        y: `-${secondDigit * 100}%`,
        duration: 0.3,
        ease: "power1.out",
      });

      count++;
    } else {
      clearInterval(interval);
      runFadeOutSequence();
    }
  }, 30); // Speed control

  function runFadeOutSequence() {
    const tl = gsap.timeline();

    tl.to(percentageFirst, {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
    });

    tl.to(
      preloaderWrap,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        pointerEvents: "none",
        onComplete: () => {
          preloaderWrap.style.display = "none";
          const hero = document.getElementById("hero");
          hero.style.display = "flex";

          // Force reflow
          void hero.offsetWidth;

          setTimeout(() => {
            const tlHero = gsap.timeline({ defaults: { ease: "power2.out" } });

            tlHero
              .to(".pr", {
                scale: 1,
                opacity: 1,
                duration: 1,
              })
              .to(".pr", {
                x: "-20px",
                duration: 0.6,
                delay: 0.1,
              })
              .to(
                ".ception span",
                {
                  opacity: 1,
                  y: -10,
                  duration: 0.3,
                  stagger: 0.1,
                },
                "-=0.3"
              );
          }, 100);
        },
      },
      "+=0.8"
    );
  }
});
// cursor

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("magic-cursor");
  const ball = document.getElementById("ball");
  const interactiveElements = document.querySelectorAll("h1, .cursor-link");

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursor.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
  });

  // Hover effect
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ball.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      ball.classList.remove("hovered");
    });
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    ball.classList.add("clicked");
  });

  document.addEventListener("mouseup", () => {
    ball.classList.remove("clicked");
  });
});

// logo carousel

(function () {
  let current = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    current = index;
  }

  document.querySelector(".prev").addEventListener("click", () => {
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
  });

  document.querySelector(".next").addEventListener("click", () => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  });

  // Auto-play
  setInterval(() => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }, 4000);
})();

// testimonial

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".testimonial").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    onEnter: () => animateIn(el),
    onEnterBack: () => animateIn(el),
  });

  function animateIn(element) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }
});

// process section

// Accordion click toggle
const accordionButtons = document.querySelectorAll(".accordion-button");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open");

    // Close all
    accordionContents.forEach((c) => c.classList.remove("open"));
    accordionButtons.forEach((b) => b.classList.remove("active"));

    // Open if not already
    if (!isOpen) {
      content.classList.add("open");
      button.classList.add("active");
    }
  });
});

// Close when clicking outside
document.addEventListener("click", function (e) {
  const isInsideAccordion = e.target.closest(".accordion");
  if (!isInsideAccordion) {
    accordionContents.forEach((c) => c.classList.remove("open"));
    accordionButtons.forEach((b) => b.classList.remove("active"));
  }
});

// Counter animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".count").forEach((counter) => {
          counter.innerText = "0";
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 50;
            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target + (target > 99 ? "+" : "");
            }
          };
          updateCount();
        });
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector("#counter-section"));

// GSAP Scroll Animation
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".process-image", {
    scrollTrigger: {
      trigger: ".process-image",
      toggleActions: "restart none restart none",
    },
    scale: 0,
    duration: 1,
    ease: "power2.out",
  });
});



// float

 gsap.registerPlugin(ScrollTrigger, Draggable);

const pills = gsap.utils.toArray("#pill-container .item");

// Animate each pill
pills.forEach((pill, i) => {
  ScrollTrigger.create({
    trigger: "#pill-container",
    start: "top 80%",
    toggleActions: "restart none none reset", // replay on every scroll into view
    onEnter: () => {
      resetPill(pill); // reset position before animation
      animateDrop(pill, i);
    }
  });
});

// Drop animation function
function animateDrop(pill, i) {
  gsap.fromTo(pill, {
    y: -150,
    opacity: 0,
    x: gsap.utils.random(-50, 50)
  }, {
    y: gsap.utils.random(100, 220),
    x: gsap.utils.random(0, 200),
    opacity: 1,
    ease: "bounce.out",
    delay: i * 0.1,
    duration: 1.2,
    onComplete: () => {
      floatAround(pill);
      makeDraggable(pill);
    }
  });
}

// Reset position before animation
function resetPill(pill) {
  gsap.set(pill, {
    y: -150,
    x: gsap.utils.random(-50, 50),
    opacity: 0
  });
}

// Floating animation
function floatAround(target) {
  gsap.to(target, {
    duration: gsap.utils.random(2, 4),
    y: "+=" + gsap.utils.random(-20, 20),
    x: "+=" + gsap.utils.random(-20, 20),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Make pill draggable
function makeDraggable(el) {
  Draggable.create(el, {
    inertia: true,
    bounds: "#pill-container",
    edgeResistance: 0.7,
    onRelease: function () {
      gsap.to(el, {
        x: gsap.utils.random(0, 200),
        y: gsap.utils.random(100, 220),
        duration: 1,
        ease: "power2.out"
      });
    }
  });
}

// Mobile shake detection to scatter pills
let lastShake = 0;
let shakeThreshold = 15;

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", function(event) {
    let acc = event.accelerationIncludingGravity;
    let currTime = new Date().getTime();

    if ((currTime - lastShake) > 1000) {
      let speed = Math.abs(acc.x + acc.y + acc.z);

      if (speed > shakeThreshold) {
        lastShake = currTime;
        shakePills();
      }
    }
  });
}

// Shake effect (scatter and return)
function shakePills() {
  pills.forEach((pill) => {
    gsap.to(pill, {
      x: "+=" + gsap.utils.random(-80, 80),
      y: "+=" + gsap.utils.random(-80, 80),
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(pill, {
          x: gsap.utils.random(0, 200),
          y: gsap.utils.random(100, 220),
          duration: 1,
          ease: "power3.out"
        });
      }
    });
  });
}

// Make sure to refresh ScrollTrigger after preloader
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
