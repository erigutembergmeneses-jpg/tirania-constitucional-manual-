// Navegação Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Atualizar link ativo
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// Calculadora do IPI (se existir na página)
function calcularIPI() {
    const d1 = parseFloat(document.getElementById('d1')?.value || 5);
    const d2 = parseFloat(document.getElementById('d2')?.value || 5);
    const d3 = parseFloat(document.getElementById('d3')?.value || 5);
    const d4 = parseFloat(document.getElementById('d4')?.value || 5);
    const d5 = parseFloat(document.getElementById('d5')?.value || 5);
    
    const ipi = (0.25 * d1) + (0.20 * d2) + (0.20 * d3) + (0.20 * d4) + (0.15 * d5);
    
    const resultElement = document.getElementById('ipiResult');
    const classElement = document.getElementById('ipiClassification');
    
    if (resultElement) {
        resultElement.textContent = ipi.toFixed(2);
        
        let classification = '';
        let className = '';
        
        if (ipi < 4) {
            classification = 'Preservação institucional muito comprometida';
            className = 'danger';
        } else if (ipi < 6) {
            classification = 'Preservação institucional fragilizada';
            className = 'warning';
        } else if (ipi < 8) {
            classification = 'Preservação institucional intermediária';
            className = 'info';
        } else {
            classification = 'Preservação institucional relativamente elevada';
            className = 'success';
        }
        
        if (classElement) {
            classElement.textContent = classification;
            classElement.className = `classification ${className}`;
        }
    }
}

// Copiar citação para área de transferência
function copyToClipboard() {
    const citation = `MENESES, Erigutemberg. Manual Executivo da Obra "A Tirania Constitucional". Blumenau, 2026. Disponível em: https://erigutembergmeneses.github.io/caps9-tirania-constitucional/. Acesso em: [data].`;
    
    navigator.clipboard.writeText(citation).then(() => {
        alert('Citação copiada para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Atualizar sliders da calculadora IPI
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const display = document.getElementById(e.target.id + 'Value');
            if (display) {
                display.textContent = value;
            }
            calcularIPI();
        });
    });
    
    // Calcular IPI inicial se existir a calculadora
    if (document.getElementById('d1')) {
        calcularIPI();
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.objective-card, .conceito-card, .ficha-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
