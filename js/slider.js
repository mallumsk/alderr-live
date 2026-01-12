    // const slides = document.querySelectorAll('.slide');
    // const dots = document.querySelectorAll('.dot');
    // const next = document.getElementById('next');
    // const prev = document.getElementById('prev');
    // let index = 0;

    // function showSlide(i) {
    //   slides.forEach((s, idx) => {
    //     s.classList.toggle('active', idx === i);
    //     dots[idx].classList.toggle('bg-pink-600', idx === i);
    //     dots[idx].classList.toggle('bg-gray-400', idx !== i);
    //   });
    // }

    // function nextSlide() {
    //   index = (index + 1) % slides.length;
    //   showSlide(index);
    // }

    // function prevSlide() {
    //   index = (index - 1 + slides.length) % slides.length;
    //   showSlide(index);
    // }

    // next.addEventListener('click', nextSlide);
    // prev.addEventListener('click', prevSlide);

    // Auto Slide
   // setInterval(nextSlide, 5000);

    // function setupSlider(containerId, nextId, prevId, intervalTime = 5000, hasDots = false) {
    //   const container = document.querySelector(`#${containerId}`);
    //   const slides = container.querySelectorAll('.slide');
    //   const nextBtn = document.getElementById(nextId);
    //   const prevBtn = document.getElementById(prevId);
    //   const dots = hasDots ? container.querySelectorAll('.dot') : [];
    //   let index = 0;

    //   function showSlide(i) {
    //     slides.forEach((slide, idx) => {
    //       slide.classList.toggle('active', idx === i);
    //       if (hasDots) {
    //         dots[idx].classList.toggle('bg-pink-600', idx === i);
    //         dots[idx].classList.toggle('bg-gray-400', idx !== i);
    //       }
    //     });
    //   }

    //   function nextSlide() {
    //     index = (index + 1) % slides.length;
    //     showSlide(index);
    //   }

    //   function prevSlide() {
    //     index = (index - 1 + slides.length) % slides.length;
    //     showSlide(index);
    //   }

    //   nextBtn.addEventListener('click', nextSlide);
    //   prevBtn.addEventListener('click', prevSlide);

    //   if (hasDots) {
    //     dots.forEach((dot, i) => {
    //       dot.addEventListener('click', () => {
    //         index = i;
    //         showSlide(index);
    //       });
    //     });
    //   }

    //   setInterval(nextSlide, intervalTime);
    // }

    // // Initialize both sliders
    // setupSlider('testimonial-slider', 'next1', 'prev1', 4000, true);
    // setupSlider('case-slider', 'next2', 'prev2', 9000, false);



    function setupSlider(containerId, nextId, prevId, intervalTime = 5000, hasDots = false) {
  const container = document.querySelector(`#${containerId}`);
  const slides = container.querySelectorAll('.slide');
  const nextBtn = document.getElementById(nextId);
  const prevBtn = document.getElementById(prevId);
  const dots = hasDots ? container.querySelectorAll('.dot') : [];
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === i);
      if (hasDots) {
        dots[idx].classList.toggle('bg-plum', idx === i);
        dots[idx].classList.toggle('bg-gray-400', idx !== i);
      }
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  if (hasDots) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        showSlide(index);
      });
    });
  }

  setInterval(nextSlide, intervalTime);
}

// Initialize both sliders
setupSlider('testimonial-slider', 'next', 'prev', 4000, true);
setupSlider('case-slider', 'next2', 'prev2', 9000, false);



    