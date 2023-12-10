document.addEventListener('DOMContentLoaded', function() {

  
  let swiper = new Swiper(".swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<div class="' + className + '" src="../public/svg/slider.svg"></div>';
      },
    },
  });


    // Получение всех кнопок навбара
  let links = document.querySelectorAll('.nav-btn');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let elementId = this.getAttribute('href').substring(1);
      let element = document.getElementById(elementId);
      if (element) {
        let navbarHeight = document.querySelector('.nav').offsetHeight;
        let elementOffset = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementOffset,
          behavior: 'smooth'
        });
      }
    }); 
  });

  // Получение всех секций на странице
  const sections = document.querySelectorAll('.section');
  console.log(sections)


  // Функция для определения текущей видимой секции
  function getCurrentSection() {
    let currentSection = sections[0];
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section;
      }
    });
    console.log(currentSection)
    return currentSection;
  }

  // Изначальное удаление класса aktive
  links.forEach(link => {
    link.classList.contains('first') ? null : link.classList.remove('active');
  })
  // Функция для подсветки кнопки в навбаре
  function highlightNavbarLink() {
    const currentSection = getCurrentSection();
    links.forEach(link => {
        link.classList.remove('active');
      const sectionId = link.getAttribute('href').substring(1);
      if (currentSection.id === sectionId) {
        link.classList.add('active');
      }
    });
  }

  // Trottle
  function throttle(func, limit) {
    let inThrottle;
    
    return function() {
      const context = this;
      const args = arguments;
      
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }
  
    // Применение Trottle для HighlightNavbarLink
  let highlightNavbarLinkThrottled = throttle(highlightNavbarLink, 140)

    // Обработчик прокрутки страницы
  window.addEventListener('scroll', () => {
    highlightNavbarLinkThrottled();
  });

  // Обработчик нажатия на кнопки в навбаре
  links.forEach(link => {
    link.addEventListener('click', () => {
      highlightNavbarLinkThrottled();
    });
  });
});


// Swiper
