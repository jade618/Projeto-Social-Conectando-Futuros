
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Função para alternar a visibilidade do menu
    menuToggle.addEventListener('change', () => {
        if (menuToggle.checked) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex', 'flex-col'); // Adiciona flex para display vertical
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex', 'flex-col');
        }
    });

    // Fechar menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // 1024px é o breakpoint 'lg' do Tailwind
                menuToggle.checked = false;
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex', 'flex-col');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#navbar-menu button');
    const navLinks = document.querySelectorAll('#navbar-menu a');
    const searchInput = document.getElementById('search-input');

    let searchOpen = false;

    searchButton.addEventListener('click', () => {
        searchOpen = !searchOpen;

        if (searchOpen) {
            // Esconde tudo
            navLinks.forEach(link => link.classList.add('hidden'));
            // Mostra barra de pesquisa
            searchInput.classList.remove('hidden');
            // Focar automático
            searchInput.focus();
        } else {
            // Volta ao normal
            navLinks.forEach(link => link.classList.remove('hidden'));
            searchInput.classList.add('hidden');
            searchInput.value = "";
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOpen) {
            searchOpen = false;
            navLinks.forEach(link => link.classList.remove('hidden'));
            searchInput.classList.add('hidden');
            searchInput.value = "";
        }
    });
});
const searchBtn = document.querySelector('#navbar-menu button i');
const searchInput = document.querySelector('#search-input');
const navLinks = document.querySelectorAll('#navbar-menu a');
const resultBox = document.getElementById('search-results');

// --- Abrir e fechar a barra ---
searchBtn.parentElement.addEventListener('click', () => {
    searchInput.classList.toggle('hidden');

    if (!searchInput.classList.contains('hidden')) {
        navLinks.forEach(link => link.classList.add('hidden'));
        searchInput.focus();
    } else {
        navLinks.forEach(link => link.classList.remove('hidden'));
        resultBox.classList.add('hidden');
    }
});

// --- Sistema de busca global ---
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        resultBox.classList.add('hidden');
        return;
    }

    const results = window.coursesData.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.keywords.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultBox.innerHTML = `<p class="p-3 text-gray-400">Nenhum resultado encontrado.</p>`;
        resultBox.classList.remove('hidden');
        return;
    }

    resultBox.innerHTML = results.map(c =>
        `
        <div class="p-3 hover:bg-gray-800 cursor-pointer flex gap-3 items-center"
             onclick="window.location.href='${c.link}'">
            <img src="${c.image}" class="w-12 h-12 object-cover rounded">
            <div>
                <p class="font-semibold">${c.title}</p>
                <p class="text-sm text-gray-400">${c.keywords}</p>
            </div>
        </div>
        `
    ).join('');

    resultBox.classList.remove('hidden');
});

// --- Esconder dropdown ao clicar fora ---
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) &&
        !searchBtn.parentElement.contains(e.target)) {
        resultBox.classList.add('hidden');
    }
});
searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        // Só fecha se o usuário NÃO clicou no dropdown
        if (!resultBox.matches(':hover')) {
            resultBox.classList.add('hidden');
            searchInput.classList.add('hidden');
            navLinks.forEach(link => link.classList.remove('hidden'));
            searchInput.value = "";
        }
    }, 150);
});

