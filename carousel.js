const carouselTrack = document.querySelector('.carousel-track');
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
let current = 0;
let slides = [];

// Fetch data from JSON
fetch('carousel-data.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      if(index === 0) slide.classList.add('active');

      slide.innerHTML = `
        <img src="${item.image}" alt="${item.alt}">
        <div class="caption">
          <div class="date">${item.date}</div>
          <p>${item.caption}</p>
        </div>
      `;
      carouselTrack.appendChild(slide);
    });

    slides = document.querySelectorAll('.carousel-slide'); // update slides after creation
  })
  .catch(err => console.error('Error loading carousel data:', err));

// Carousel navigation
function showSlide(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
}

nextBtn.addEventListener('click', () => showSlide(current + 1));
prevBtn.addEventListener('click', () => showSlide(current - 1));
