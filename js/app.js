// Menu móvel
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('open');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Cards expansíveis
document.querySelectorAll('.card-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    const content = button.nextElementSibling;
    content.classList.toggle('open', !expanded);
  });
});

// Abre o card se a URL tiver hash correspondente a um card (opcional)
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const btn = target.querySelector('.card-toggle');
      if (btn && btn.getAttribute('aria-expanded') === 'false') {
        btn.click();
      }
    }
  }
});
