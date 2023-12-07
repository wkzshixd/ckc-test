document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('.nav-btn');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        let elementId = this.getAttribute('href').substring(1);
        let element = document.getElementById(elementId);

        if (element) {
          let navbarHeight = document.querySelector('.nav').offsetHeight;
          let elementOffset = element.offsetTop - navbarHeight - 65;
          window.scrollTo({
            top: elementOffset,
            behavior: 'smooth'
          });
        }
      });
    });
  });