// ACESSIBILIDADE (TEMA E FONTE) ---

const btnContrast = document.getElementById('btn-contrast');
const btnIncreaseFont = document.getElementById('btn-increase-font');
const btnDecreaseFont = document.getElementById('btn-decrease-font');

function loadTheme() {
    const theme = localStorage.getItem('focoPlayTheme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
}

loadTheme();

if (btnContrast) {
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('focoPlayTheme', isLight ? 'light' : 'dark');
    });
}

let currentFontSize = 16; 

if (btnIncreaseFont) {
    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontSize < 24) { 
            currentFontSize += 2;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });
}

if (btnDecreaseFont) {
    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontSize > 12) { 
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });
}


// sidebar
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

if (menuIcon && sidebar) {
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

const searchInput = document.getElementById('search-input');
const videoCards = document.querySelectorAll('.video-card');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();

        videoCards.forEach(card => {
            const title = card.querySelector('.video-title').innerText.toLowerCase();
            const channel = card.querySelector('.channel-name').innerText.toLowerCase();

            if (title.includes(searchText) || channel.includes(searchText)) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    });
}


const modal = document.getElementById('video-modal');
const iframe = document.getElementById('youtube-iframe');
const modalTitle = document.getElementById('modal-title');
const modalChannel = document.getElementById('modal-channel');

function abrirVideo(videoId, titulo, canal) {
    if (modal) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        iframe.src = embedUrl;
        modalTitle.innerText = titulo;
        modalChannel.innerText = canal;

        modal.style.display = 'flex';
    }
}

function fecharVideo() {
    if (modal) {
        modal.style.display = 'none';
        iframe.src = '';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        fecharVideo();
    }
}


//COMENTÁRIO ---

const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

function adicionarComentario() {
    const texto = commentInput.value.trim();

    if (texto !== "") {
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comment');
        
        novoComentario.innerHTML = `
            <span class="user">Você:</span>
            <span class="text">${texto}</span>
        `;

        commentsList.prepend(novoComentario);

        commentInput.value = '';
    } else {
        alert("Por favor, escreva um comentário antes de enviar.");
    }
}