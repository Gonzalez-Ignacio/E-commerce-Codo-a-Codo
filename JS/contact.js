// Id de campos
const inputName = document.getElementById("name")
const inputEmail = document.getElementById("email")
const inputPhone = document.getElementById("phone")
const inputMessage = document.getElementById("message")
const btnSend = document.getElementById("btn-send")
const conditionPrivacy = document.getElementById("condition-privacy")
// Id mensajes de error
const errorName = document.getElementById("name-error")
const errorEmailInputVoid = document.getElementById("email-error-input-void")
const errorEmailNotInclude = document.getElementById("email-error-not-include-condition")
const errorPhone = document.getElementById("phone-error")
const errorMessage = document.getElementById("message-error")
const errorConditionPrivacy = document.getElementById("condition-privacy-error")
// Mensaje a enviar
const mensajeEnviado = document.getElementById("mensaje-enviado")


function checkInputs() {
    // Obtener valores de los inputs
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let messageValue = inputMessage.value
    let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)

    // Verificar que los campos sean verdaderos
    let cumplirRequisitos = true
    
    // Evaluar cada Campo
    if (nameValue !== "") {
        errorName.classList.add("d-none");
    } else {
        errorName.classList.remove("d-none");
        cumplirRequisitos = false
    }

    // Error de Email Vació
    if (emailValue !== "") {
        errorEmailInputVoid.classList.add("d-none");
    } else {
        errorEmailInputVoid.classList.remove("d-none");
        cumplirRequisitos = false
    }
    // Error de Email sin cumplir condiciones
    if (isEmailValid) {
        errorEmailNotInclude.classList.add("d-none");
    } else {
        errorEmailNotInclude.classList.remove("d-none");
        cumplirRequisitos = false
    }

    if (phoneValue !== "") {
        errorPhone.classList.add("d-none");
    } else {
        errorPhone.classList.remove("d-none");
        cumplirRequisitos = false
    }

    if (messageValue !== "") {
        errorMessage.classList.add("d-none");
    } else {
        errorMessage.classList.remove("d-none");
        cumplirRequisitos = false
    }

    if (conditionPrivacy.checked) {
        errorConditionPrivacy.classList.add("d-none");
    } else {
        errorConditionPrivacy.classList.remove("d-none");
        cumplirRequisitos = false
    }

    if (cumplirRequisitos) {
        mensajeEnviado.classList.remove("d-none");
    }

    return cumplirRequisitos;
}

btnSend.addEventListener("click", () => {
    event.preventDefault();

    checkInputs()
})
