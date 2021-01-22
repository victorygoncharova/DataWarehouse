(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const screenWidth = document.documentElement.clientWidth,
      screenTablet = 767;

    if (screenWidth > screenTablet) {
      initSlider(
        ".slideshow",
        ".slideshow__slides",
        ".slideshow__slide",
        ".slideshow__control_prev",
        ".slideshow__control_next"
      );
    }

    function initSlider(
      rootSelector,
      wrapperSelector,
      slidesSelector,
      prevSelector,
      nextSelector
    ) {
      const root = document.querySelector(rootSelector),
        slidesWrapper = root.querySelector(wrapperSelector),
        slides = root.querySelectorAll(slidesSelector),
        prev = root.querySelector(prevSelector),
        next = root.querySelector(nextSelector),
        slidesQuantity = slides.length,
        firstSlide = slides[0],
        slideMargin = parseInt(
          window.getComputedStyle(firstSlide, null).marginRight
        ),
        slideWidth = firstSlide.offsetWidth + slideMargin;

      let posInitial,
        currentSlide = 0;

      dotsToggle(currentSlide);

      prev.setAttribute("disabled", true);

      next.addEventListener("click", () => nextClickHandler(1));
      prev.addEventListener("click", () => prevClickHandler(-1));

      function nextClickHandler() {
        if (currentSlide == slidesQuantity - 1) {
          next.setAttribute("disabled", true);
        } else {
          shiftSlide(1);
          dotsToggle(currentSlide);
        }
      }

      function prevClickHandler() {
        if (currentSlide == 0) {
          prev.setAttribute("disabled", true);
        } else {
          shiftSlide(-1);
          dotsToggle(currentSlide);
        }
      }

      function shiftSlide(dir) {
        slidesWrapper.classList.add("shifting");
        next.removeAttribute("disabled");
        prev.removeAttribute("disabled");

        posInitial = slidesWrapper.offsetLeft;

        if (dir == 1) {
          slidesWrapper.style.left = `${posInitial - slideWidth}px`;
          currentSlide++;

          if (currentSlide == slidesQuantity - 1) {
            next.setAttribute("disabled", true);
          }
        }

        if (dir == -1) {
          slidesWrapper.style.left = `${posInitial + slideWidth}px`;
          currentSlide--;

          if (currentSlide == 0) {
            prev.setAttribute("disabled", true);
          }
        }
      }
    }

    function dotsToggle(currentSlide) {
      const dots = document.querySelectorAll(".dots__item");

      dots.forEach((item, i) => {
        dots[i].classList.remove("active");
      });

      dots.forEach((item, i) => {
        if (i == currentSlide) {
          dots[i].classList.add("active");
        }
      });
    }
  });
})();
