// --- 1. ACESSIBILIDADE (TEMA E FONTE) ---

// Seleciona os botões
const btnContrast = document.getElementById('btn-contrast');
const btnIncreaseFont = document.getElementById('btn-increase-font');
const btnDecreaseFont = document.getElementById('btn-decrease-font');

// Função para carregar o tema salvo
function loadTheme() {
    const theme = localStorage.getItem('focoPlayTheme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Carrega o tema ao iniciar
loadTheme();

// Evento do botão de Contraste
if (btnContrast) {
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Salva a preferência do usuário
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('focoPlayTheme', isLight ? 'light' : 'dark');
    });
}

// Controle de Tamanho da Fonte
let currentFontSize = 16; // Tamanho inicial (igual ao CSS)

if (btnIncreaseFont) {
    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontSize < 24) { // Limite máximo
            currentFontSize += 2;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });
}

if (btnDecreaseFont) {
    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontSize > 12) { // Limite mínimo
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });
}


// --- 2. BARRA DE PESQUISA ---

const searchInput = document.getElementById('search-input');
const videoCards = document.querySelectorAll('.video-card');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();

        videoCards.forEach(card => {
            // Pega o texto do título e do canal de cada card
            const title = card.querySelector('.video-title').innerText.toLowerCase();
            const channel = card.querySelector('.channel-name').innerText.toLowerCase();

            // Se o título OU o canal contiver o texto digitado, mostra o card
            if (title.includes(searchText) || channel.includes(searchText)) {
                card.style.display = 'flex'; // Mostra
            } else {
                card.style.display = 'none'; // Esconde
            }
        });
    });
}


// --- 3. PLAYER DE VÍDEO (MODAL) ---

const modal = document.getElementById('video-modal');
const iframe = document.getElementById('youtube-iframe');
const modalTitle = document.getElementById('modal-title');
const modalChannel = document.getElementById('modal-channel');

// Função chamada ao clicar em um vídeo na Home
function abrirVideo(videoId, titulo, canal) {
    if (modal) {
        // Monta a URL do YouTube com autoplay
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        // Atualiza as informações dentro do Modal
        iframe.src = embedUrl;
        modalTitle.innerText = titulo;
        modalChannel.innerText = canal;

        // Torna o modal visível
        modal.style.display = 'flex';
    }
}

// Função para fechar o Modal
function fecharVideo() {
    if (modal) {
        modal.style.display = 'none';
        
        // Limpa o src do iframe para parar o vídeo
        iframe.src = '';
    }
}

// Fecha o modal se o usuário clicar na parte escura (fora do vídeo)
window.onclick = function(event) {
    if (event.target == modal) {
        fecharVideo();
    }
}


// --- 4. COMENTÁRIOS ---

const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

function adicionarComentario() {
    const texto = commentInput.value.trim();

    if (texto !== "") {
        // Cria um novo elemento div para o comentário
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comment');
        
        // Preenche o HTML do comentário
        novoComentario.innerHTML = `
            <span class="user">Você:</span>
            <span class="text">${texto}</span>
        `;

        // Adiciona o novo comentário no topo da lista
        commentsList.prepend(novoComentario);

        // Limpa o campo de digitação
        commentInput.value = '';
    } else {
        alert("Por favor, escreva um comentário antes de enviar.");
    }
}