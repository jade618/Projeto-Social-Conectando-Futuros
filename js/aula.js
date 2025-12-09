
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0D1117', /* Fundo principal escuro */
                'navy-dark': '#101620', /* Fundo do header e footer */
                'primary-blue': '#007bff', /* Azul de destaque (links, botões) */
                'text-light': '#C9D1D9', /* Texto cinza claro */
                'bg-card': '#161B22', /* Fundo do cartão ligeiramente mais claro */
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            }
        }
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('change', function () {
        if (menuToggle.checked) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    });
});