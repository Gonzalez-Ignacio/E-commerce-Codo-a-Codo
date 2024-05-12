const iniciarSesion = document.getElementById("form-iniciar-sesion");
const inicioExitoso = document.getElementById("inicio-exitoso");
const voidUserError = document.getElementById("void-user-error");
const voidPasswordError = document.getElementById("void-password-error");
const dataError = document.getElementById("data-error");


iniciarSesion.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const usuario = document.getElementById("usuario").value;
    const pass = document.getElementById("pass").value;

    if (datosVacios(usuario, pass)) {
        if (usuario === "admin" && pass === "admin") {
            inicioExitoso.style.display = "block";
            dataError.style.display = "none";
            console.log("Usuario y contraseña correctos:", usuario, pass);
        } else {
            inicioExitoso.style.display = "none";
            dataError.style.display = "block";
            console.log("Usuario y/o contraseña incorrectos:", usuario, pass);
        }
    };
 

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