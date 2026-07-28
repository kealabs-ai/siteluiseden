// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// HAMBURGER MENU
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('hidden');
});

// CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.add('hidden');
  });
});

// CLOSE MENU ON WINDOW RESIZE
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navLinks.classList.add('hidden');
  }
});

// FILTER GALLERY
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'todos' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// FORM SUBMISSION
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const servico = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value;

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  // Simular envio
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem enviada!';
  btn.style.background = '#4a7c2c';

  setTimeout(() => {
    contactForm.reset();
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 3000);

  console.log({
    nome,
    telefone,
    email,
    servico,
    mensagem
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// INTERSECTION OBSERVER PARA ANIMAÇÕES
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .flori-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});
