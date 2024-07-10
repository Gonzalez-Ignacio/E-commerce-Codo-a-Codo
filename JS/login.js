const iniciarSesion = document.getElementById("form-iniciar-sesion");
const inicioExitosoUser = document.getElementById("inicio-exitoso-user");
const inicioExitosoAdmin = document.getElementById("inicio-exitoso-admin");
const inicioDenegado = document.getElementById("inicio-denegado");
const voidUserError = document.getElementById("void-user-error");
const voidPasswordError = document.getElementById("void-password-error");
const dataError = document.getElementById("data-error");


iniciarSesion.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const pass = document.getElementById("pass").value;
    const userAdmin = document.getElementById("userAdmin");


    if (datosVacios(usuario, pass)) {
        fetch(`http://localhost:3000/usuarios/nombre/${usuario}`)
            .then(response => response.json())
            .then(data => {

                const user = data[0]

                if (usuario === user.nombreUsuario && pass === user.contraseña) {

                    //un usuario normal intenta entrar como administrador
                    if (user.adminUser === 'no' && userAdmin.checked){
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
                            //cambiar la ruta!!!!
                            window.location.href = "signUp.html";
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
                    
                } else {
                    inicioExitosoUser.style.display = "none";
                    inicioExitosoAdmin.style.display = "none";
                    inicioDenegado.style.display = "none";
                    dataError.style.display = "block";
                    console.log("Usuario y/o contraseña incorrectos:", usuario, pass);
                }

            })
            .catch(error => {
                console.error('Error:', error);
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