const url = 'http://localhost:3000';

const iniciarSesion = document.getElementById("form-iniciar-sesion");
const inicioExitosoUser = document.getElementById("inicio-exitoso-user");
const inicioExitosoAdmin = document.getElementById("inicio-exitoso-admin");
const inicioDenegado = document.getElementById("inicio-denegado");
const voidUserError = document.getElementById("void-user-error");
const voidPasswordError = document.getElementById("void-password-error");
const dataError = document.getElementById("data-error");


iniciarSesion.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("pass").value;
    const userAdmin = document.getElementById("userAdmin");


    if (datosVacios(nombreUsuario, contraseña)) {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombreUsuario, contraseña }),
        };

        fetch(`${url}/auth/login`, options)
            .then((response) => {
                // Si no obtenemos respuesta...
                if (!response.ok) {
                    throw new Error("Error al iniciar sesión");
                }
                //Retornamos lo recibido desde el servidor
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.token);

                const user = data.result[0]

                //un usuario normal intenta entrar como administrador
                if (user.adminUser === 'no' && userAdmin.checked) {
                    inicioExitosoUser.style.display = "none";
                    inicioExitosoAdmin.style.display = "none";
                    inicioDenegado.style.display = "block";
                    dataError.style.display = "none";
                    setTimeout(() => {
                        inicioDenegado.style.display = "none";
                    }, 4000);

                }
                else if (user.adminUser === 'si' && userAdmin.checked) {
                    inicioExitosoUser.style.display = "none";
                    inicioExitosoAdmin.style.display = "block";
                    inicioDenegado.style.display = "none";
                    dataError.style.display = "none";
                    // Redirigir al usuario a la pagina de administrador
                    setTimeout(() => {
                        window.location.href = "adminUsers.html";
                    }, 4000);

                } else {
                    inicioExitosoUser.style.display = "block";
                    inicioExitosoAdmin.style.display = "none";
                    inicioDenegado.style.display = "none";
                    dataError.style.display = "none";
                    // Redirigir al usuario a la pagina de index
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 4000);
                }
            })

            .catch(error => {
                console.error('Error:', error);
                inicioExitosoUser.style.display = "none";
                inicioExitosoAdmin.style.display = "none";
                inicioDenegado.style.display = "none";
                dataError.style.display = "block";
                setTimeout(() => {
                    dataError.style.display = "none";
                    console.log("Usuario y/o contraseña incorrectos:", usuario, pass);
                }, 4000);
            });
    }
})

function datosVacios(usuario, pass) {
    if (usuario !== "") {
        voidUserError.style.display = "none";
    } else {
        voidUserError.style.display = "block";
    }

    if (pass !== "") {
        voidPasswordError.style.display = "none";
    } else {
        voidPasswordError.style.display = "block";
    }

    return usuario !== "" || pass !== "";
}