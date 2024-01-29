document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutButton = document.getElementById('logoutButton');

    function verificarSesion() {
        const usuarioAutenticado = sessionStorage.getItem('usuarioAutenticado') === 'true';

        if (usuarioAutenticado) {
            logoutButton.style.display = 'block';
        } else {
            logoutButton.style.display = 'none';
        }
    }

    verificarSesion();

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const storedUser = JSON.parse(sessionStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            sessionStorage.setItem('usuarioAutenticado', 'true');
            verificarSesion();
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Redireccionando en 5 segundos...',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../index.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas',
                text: 'Por favor, verifica tu email y contraseña.'
            });
        }
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Por favor, verifica las contraseñas ingresadas.'
            });
            return;
        }

        const existingUser = JSON.parse(sessionStorage.getItem(email));
        if (existingUser) {
            Swal.fire({
                icon: 'error',
                title: 'El usuario ya existe',
                text: 'Ya existe un usuario registrado con este email.'
            });
            return;
        }

        const newUser = {
            email: email,
            password: password
        };
        sessionStorage.setItem(email, JSON.stringify(newUser));

        Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            text: 'Ahora inicie sesion',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false
        })
    });

    logoutButton.addEventListener('click', function() {
        sessionStorage.removeItem('usuarioAutenticado');
        verificarSesion();
        Swal.fire({
            icon: 'info',
            title: 'Cierre de sesión exitoso',
            text: 'Redireccionando en 5 segundos...',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            window.location.href = '../index.html';
        });
    });
});
