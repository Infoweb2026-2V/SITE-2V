// Script do Mascote - Funcionalidades interativas
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos
    const mascoteImg = document.getElementById('mascoteImg');
    const btnCarinho = document.getElementById('darCarinhoBtn');
    const mascoteLikesSpan = document.getElementById('mascote-likes');
    const mascoteMensagensSpan = document.getElementById('mascote-mensagens');
    
    // Carregar dados salvos no localStorage
    let likes = localStorage.getItem('mascoteLikes') ? parseInt(localStorage.getItem('mascoteLikes')) : 0;
    let mensagens = localStorage.getItem('mascoteMensagens') ? parseInt(localStorage.getItem('mascoteMensagens')) : 0;
    
    // Atualizar display
    if (mascoteLikesSpan) mascoteLikesSpan.textContent = likes;
    if (mascoteMensagensSpan) mascoteMensagensSpan.textContent = mensagens;
    
    // Função para criar coração animado
    function criarCoracao(x, y) {
        const coracao = document.createElement('div');
        coracao.innerHTML = '<i class="fa-solid fa-heart"></i>';
        coracao.classList.add('coracao-animado');
        coracao.style.left = (x - 15) + 'px';
        coracao.style.top = (y - 15) + 'px';
        document.body.appendChild(coracao);
        
        setTimeout(() => {
            coracao.remove();
        }, 1000);
    }
    
    // Função para dar carinho
    function darCarinho(event) {
        likes++;
        if (mascoteLikesSpan) mascoteLikesSpan.textContent = likes;
        localStorage.setItem('mascoteLikes', likes);
        
        // Animação de clique no mascote
        if (mascoteImg) {
            mascoteImg.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mascoteImg.style.transform = '';
            }, 200);
        }
        
        // Criar coração na posição do clique
        let x, y;
        if (event.clientX && event.clientY) {
            x = event.clientX;
            y = event.clientY;
        } else if (mascoteImg) {
            const rect = mascoteImg.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        } else {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                criarCoracao(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
            }, i * 50);
        }
        
        // Mensagem de feedback
        const frases = ["🥰 Obrigado pelo carinho!", "💖 Você é demais!", "🐾 Auuu! Adorei!", "🤗 Mais um carinho!", "✨ Que fofo!"];

        const mensagemAleatoria = frases[Math.floor(Math.random() * frases.length)];
        const notificacao = document.createElement('div');
        notificacao.textContent = mensagemAleatoria;
        notificacao.style.position = 'fixed';
        notificacao.style.bottom = '100px';
        notificacao.style.left = '50%';
        notificacao.style.transform = 'translateX(-50%)';
        notificacao.style.backgroundColor = 'var(--accent)';
        notificacao.style.color = 'var(--bg-base)';
        notificacao.style.padding = '10px 20px';
        notificacao.style.borderRadius = '40px';
        notificacao.style.fontWeight = 'bold';
        notificacao.style.zIndex = '9999';
        notificacao.style.animation = 'subirESumir 2s ease forwards';
        
        if (!document.querySelector('#animacaoNotificacao')) {
            const style = document.createElement('style');
            style.id = 'animacaoNotificacao';
            style.textContent = `
                @keyframes subirESumir {
                    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notificacao);
        setTimeout(() => notificacao.remove(), 2000);
    }
    
    // Função para enviar mensagem (abre modal)
    function enviarMensagem() {
        mensagens++;
        if (mascoteMensagensSpan) mascoteMensagensSpan.textContent = mensagens;
        localStorage.setItem('mascoteMensagens', mensagens);
        
        // Simular envio de mensagem
        alert("💬 Mensagem enviada para o mascote! Ele ficou feliz com sua mensagem!");
    }
    
    // Eventos
    if (btnCarinho) {
        btnCarinho.addEventListener('click', (e) => darCarinho(e));
    }
    
    if (mascoteImg) {
        mascoteImg.addEventListener('click', (e) => darCarinho(e));
        mascoteImg.style.animation = 'flutuarMascote 3s ease-in-out infinite';
    }
    
    window.darCarinho = darCarinho;
    window.enviarMensagem = enviarMensagem;
    
    const mascoteNome = document.querySelector('.mascote-info h3');
    if (mascoteNome && mascoteNome.textContent === 'Conheça nosso mascote!') {
    }
    
    console.log('🐾 Mascote carregado! Clique nele ou no botão para dar carinho!');
});