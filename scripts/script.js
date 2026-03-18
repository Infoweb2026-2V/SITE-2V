document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Digitação (Typing Effect)
    const textElement = document.getElementById('typing-text');
    const words = ["Informática.", "Inovação.", "Tecnologia.", "Código."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!textElement) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Tempo parado lendo a palavra
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Tempo parado antes da próxima
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    setTimeout(typeEffect, 500);

    // 2. Menu Mobile Responsivo (Botão Hambúrguer)
    const btnMenu = document.getElementById('btn-menu');
    const navLinks = document.querySelector('.nav-links');
    const iconMenu = btnMenu.querySelector('i');

    btnMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        if(navLinks.classList.contains('show')) {
            iconMenu.classList.replace('fa-bars-staggered', 'fa-xmark');
        } else {
            iconMenu.classList.replace('fa-xmark', 'fa-bars-staggered');
        }
    });

    // Fechar menu mobile ao clicar num link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            iconMenu.classList.replace('fa-xmark', 'fa-bars-staggered');
        });
    });

    // 3. Scroll Reveal (Aparecer ao rolar a página)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 4. Highlight Menu (Marca a seção que você está lendo)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 5. Ano Dinâmico no Rodapé
    const spanAno = document.getElementById('ano');
    if(spanAno) spanAno.textContent = new Date().getFullYear();

    // 6. Tema Claro/Escuro (Light/Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) { 
        const themeIcon = themeToggleBtn.querySelector('i');

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 7. Botão Voltar ao Topo (Back to Top)
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }

    // 8. Animação de Contadores (Seção de Estatísticas)
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('estatisticas');
    let animated = false;

    if (statsSection && counters.length > 0) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos && !animated) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        const speed = 50; 
                        const inc = target / speed; 

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target + (target >= 300 ? '+' : '');
                        }
                    };
                    updateCount();
                });
                animated = true; 
            }
        });
    }
    
    // 10. Scroll Progress Bar (Barra de progresso de leitura)
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollable) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    // 11. Gerador de Partículas (Efeito visual de tecnologia no fundo do início)
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 25; // Quantidade de partículas
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamanho aleatório entre 2px e 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição inicial aleatória
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100 + 20}vh`;
            
            // Velocidade e atraso aleatórios
            particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
    createParticles();

    // 12. Efeito 3D (Tilt) Interativo nos Cards
    const tiltCards = document.querySelectorAll('.tilt-element');
    
    // Só aplica o efeito em telas maiores (Desktop) para evitar conflito com touch
    if (window.matchMedia("(min-width: 850px)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top; 
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -8; 
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; 
            });
        });
    }
});

// 9. Preloader Fade Out (Mantido no escopo correto, acionado no load da janela)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); 
    }
});
