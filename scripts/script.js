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

    // ---------------------------------------------------------
    // 6. Tema Claro/Escuro (Light/Dark Mode)
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Verificação de segurança caso o botão não exista na página
    if (themeToggleBtn) { 
        const themeIcon = themeToggleBtn.querySelector('i');

        // Verifica se o usuário já tem uma preferência salva (mantém o tema ao recarregar)
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Alterna o tema ao clicar
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Troca o ícone e salva a preferência no LocalStorage
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
