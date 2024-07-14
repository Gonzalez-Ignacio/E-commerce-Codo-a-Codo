const url = 'http://localhost:3000';

document.getElementById('formregistro').addEventListener('submit', function (event) {
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

const tituloPrincipal = document.querySelector("h1");

document.getElementById('formregistro').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreUsuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('pass').value;
    const email = document.getElementById('mail').value;
    const adminUser = tituloPrincipal.textContent.trim() === "ADMINISTRADOR" ? 'si' : 'no'

    // Objeto para configurar el fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreUsuario, contraseña, email, adminUser })
    };

    fetch(`${url}/auth/register`, options)
        .then((response) => {
            //Si no obtenemos respuesta...
            if (!response.ok) {
                throw new Error("Error al registrarse");
            }
            //Retornamos lo recibido desde el servidor
            return response.json();
        })
        .then(() => {
            document.getElementById('formregistro').reset();
        })
        .catch ((error) => {
        console.error("Error:", error);
        alert("Error al registrarse");
    });
});
