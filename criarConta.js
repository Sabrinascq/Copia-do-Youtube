// --- SELEÇÃO DE ELEMENTOS ---
const userForm = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const btnClear = document.getElementById('btn-clear');
const userListContainer = document.getElementById('user-list');
const searchInput = document.getElementById('search-input');
const btnDeleteAll = document.getElementById('btn-delete-all');

// Elementos de Acessibilidade
const btnContrast = document.getElementById('btn-contrast');
const btnIncreaseFont = document.getElementById('btn-increase-font');
const btnDecreaseFont = document.getElementById('btn-decrease-font');
const htmlElement = document.documentElement;

// --- VARIÁVEIS GLOBAIS ---
let users = []; // Array para armazenar os usuários

// --- FUNÇÕES DE INICIALIZAÇÃO ---
// Ao carregar a página, recupera dados do Local Storage e o Tema
window.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    renderUsers();
    loadTheme();
});

// --- LÓGICA DE CADASTRO (CRUD) ---

// 1. Adicionar Usuário
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = new Date().toLocaleString('pt-BR'); // Data atual formatada

    if (name && email) {
        const newUser = {
            id: Date.now(), // ID único baseado no tempo
            name: name,
            email: email,
            date: date
        };

        users.push(newUser);
        saveToStorage();
        renderUsers();
        
        // Limpar campos após cadastro
        userForm.reset();
        nameInput.focus();
    }
});

// 2. Limpar Campos
btnClear.addEventListener('click', () => {
    userForm.reset();
});

// 3. Renderizar Lista na Tela
function renderUsers(filterText = '') {
    userListContainer.innerHTML = ''; // Limpa a lista atual

    // Filtra usuários se houver texto na pesquisa
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredUsers.length === 0) {
        userListContainer.innerHTML = '<p class="empty-msg">Nenhum usuário encontrado.</p>';
        return;
    }

    // Cria o HTML para cada usuário
    filteredUsers.forEach(user => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('user-item');

        itemDiv.innerHTML = `
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${user.email}</p>
                <p><small>Cadastrado em: ${user.date}</small></p>
            </div>
            <button class="btn-delete" onclick="deleteUser(${user.id})">Excluir item</button>
        `;

        userListContainer.appendChild(itemDiv);
    });
}

// 4. Excluir Item Específico
// Definimos a função no window para ser acessível pelo atributo onclick

window.deleteUser = function(id) {
    if(confirm('Tem certeza que deseja excluir este usuário?')) {
        users = users.filter(user => user.id !== id);
        saveToStorage();
        renderUsers(searchInput.value); // Mantém o filtro atual se houver
    }
};

// 5. Excluir Todos
btnDeleteAll.addEventListener('click', () => {
    if (users.length > 0 && confirm('Atenção! Isso apagará TODOS os usuários cadastrados. Confirmar?')) {
        users = [];
        saveToStorage();
        renderUsers();
    }
});

// 6. Pesquisar (Filtrar)
searchInput.addEventListener('input', (e) => {
    renderUsers(e.target.value);
});

// 7. Local Storage
function saveToStorage() {
    localStorage.setItem('focoPlayUsers', JSON.stringify(users));
}

function loadUsers() {
    const storedUsers = localStorage.getItem('focoPlayUsers');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
}

// --- ACESSIBILIDADE E TEMA ---

// Contraste (Tema Claro/Escuro)
btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Salvar preferência no localStorage
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('focoPlayTheme', isLight ? 'light' : 'dark');
});

function loadTheme() {
    const savedTheme = localStorage.getItem('focoPlayTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Controle de Fonte (A+, A-)
let currentFontSize = 16; // Tamanho base em pixels

btnIncreaseFont.addEventListener('click', () => {
    if (currentFontSize < 24) { // Limite máximo
        currentFontSize += 2;
        updateFontSize();
    }
});

btnDecreaseFont.addEventListener('click', () => {
    if (currentFontSize > 12) { // Limite mínimo
        currentFontSize -= 2;
        updateFontSize();
    }
});

function updateFontSize() {
    // Atualiza a variável CSS que controla o tamanho base
    document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
}