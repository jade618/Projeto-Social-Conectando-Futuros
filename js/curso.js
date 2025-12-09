 document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            // Função para alternar a visibilidade do menu
            menuToggle.addEventListener('change', () => {
                if (menuToggle.checked) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('flex', 'flex-col');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex', 'flex-col');
                }
            });

            // Fechar menu ao clicar em um link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 1024) { 
                        menuToggle.checked = false;
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('flex', 'flex-col');
                    }
                });
            });
        });