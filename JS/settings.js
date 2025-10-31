document.addEventListener('DOMContentLoaded', () => {

    
    const backLink = document.getElementById('back-to-dashboard-link');
    if (backLink) {
        const params = new URLSearchParams(window.location.search);
        const cameFrom = params.get('from');
        const userRole = localStorage.getItem('userRole');

        if (cameFrom === 'forum') {
            backLink.href = "forum.html";
            backLink.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>Voltar ao Fórum';
        } else if (cameFrom === 'empresa' || userRole === 'Empresa') {
            
            backLink.href = "Empresa.html";
            backLink.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>Voltar ao Painel';
        } else {
            
            backLink.href = "painel.html";
            backLink.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>Voltar ao Painel';
        }
    }
    

    
    const usernameInput = document.getElementById('username');
    const saveUsernameBtn = document.getElementById('save-username');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const resetProgressBtn = document.getElementById('reset-progress');
    const htmlElement = document.documentElement;

    
    function loadSettings() {
        const savedUsername = localStorage.getItem('currentUser');
        if (savedUsername) {
            usernameInput.value = savedUsername;
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            darkModeToggle.checked = true;
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }

    
    saveUsernameBtn.addEventListener('click', () => {
        const newUsername = usernameInput.value.trim();
        if (newUsername) {
            localStorage.setItem('currentUser', newUsername);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Seu nome foi atualizado.',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O nome de usuário não pode ficar em branco.',
            });
        }
    });

    
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    
    resetProgressBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Sua inscrição em todos os cursos será removida! Esta ação não pode ser desfeita.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, resetar meu progresso!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                
                localStorage.removeItem('cursosInscritos');
                localStorage.removeItem('forumPostsHTML');
                

                Swal.fire(
                    'Resetado!',
                    'Seu progresso foi limpo com sucesso.',
                    'success'
                );
            }
        });
    });

    loadSettings();
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}