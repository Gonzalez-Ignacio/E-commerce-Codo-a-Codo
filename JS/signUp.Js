document.getElementById('formregistro').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('mail').value;
    var contraseña = document.getElementById('pass').value;
    var mensajeExitoso = document.getElementById('inicio-exitoso');

    // Verificar que todos los campos no estén vacíos
    if (usuario !== '' && email !== '' && contraseña !== '') {
        mensajeExitoso.style.display = 'block';
        // Redirigir a la pagina de iniciar sesión
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 4000);
    } else {
        // Si hay algún campo vacío, no mostrar el mensaje de éxito
        mensajeExitoso.style.display = 'none';
    }
});

const url = 'http://localhost:3000';

document.getElementById('formregistro').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('pass').value;
    const email = document.getElementById('mail').value;

    fetch(`${url}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password,email})
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('formregistro').reset();
    });
});
