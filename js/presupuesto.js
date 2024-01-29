function validarFormulario() {
    var nombreInput = document.getElementById("nameFormControlInput");
    var emailInput = document.getElementById("exampleFormControlInput");
    var ciudadInput = document.getElementById("cityFormControlInput");
    var telefonoInput = document.getElementById("phonoFormControlInput");
    var informacionTextarea = document.getElementById("exampleFormControlTextarea");

    if (nombreInput.value === "" || emailInput.value === "" || ciudadInput.value === "" || telefonoInput.value === "" || informacionTextarea.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
    } else {

        nombreInput.value = "";
        emailInput.value = "";
        ciudadInput.value = "";
        telefonoInput.value = "";
        informacionTextarea.value = "";

        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Formulario enviado correctamente.',
        });
    }
}
