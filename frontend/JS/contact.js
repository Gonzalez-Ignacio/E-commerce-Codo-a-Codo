// Id de campos
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputMessage = document.getElementById("message");
const btnSend = document.getElementById("btn-send");
const conditionPrivacy = document.getElementById("condition-privacy");

// Id mensajes de error
const errorName = document.getElementById("name-error");
const errorEmailInputVoid = document.getElementById("email-error-input-void");
const errorEmailNotInclude = document.getElementById("email-error-not-include-condition");
const errorPhone = document.getElementById("phone-error");
const errorMessage = document.getElementById("message-error");
const errorConditionPrivacy = document.getElementById("condition-privacy-error");

// Mensaje a enviar
const mensajeEnviado = document.getElementById("mensaje-enviado");

// Función para validar inputs
function checkInputs() {
    // Obtener valores de los inputs
    const nameValue = inputName.value.trim();
    const emailValue = inputEmail.value.trim();
    const phoneValue = inputPhone.value.trim();
    const messageValue = inputMessage.value.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    // Inicializar variable para cumplir requisitos
    let cumplirRequisitos = true;

    // Función para mostrar u ocultar mensajes de error
    function toggleError(element, condition) {
        if (condition) {
            element.classList.add("d-none");
        } else {
            element.classList.remove("d-none");
            cumplirRequisitos = false;
        }
    }

    // Evaluar cada campo
    toggleError(errorName, nameValue !== "");
    toggleError(errorEmailInputVoid, emailValue !== "");
    toggleError(errorEmailNotInclude, isEmailValid);
    toggleError(errorPhone, phoneValue !== "");
    toggleError(errorMessage, messageValue !== "");
    toggleError(errorConditionPrivacy, conditionPrivacy.checked);

    // Mostrar mensaje de enviado si se cumplen los requisitos
    if (cumplirRequisitos) {
        mensajeEnviado.classList.remove("d-none");
    }

    return cumplirRequisitos;
}

// Agregar evento al botón de envío
if (btnSend) {
    btnSend.addEventListener("click", (event) => {
        event.preventDefault();
        checkInputs();
    });
}
