let formulario = document.getElementById("registro");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let fono = document.getElementById("fono");
let fenac = document.getElementById("fenac");
let especialidad = document.getElementById("especialidad");
let modalidad = document.getElementsByName("modalidad");
let contra = document.getElementById("contrasena");
let confirmar = document.getElementById("confirmar");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1 nombre: obligatorio, solo letras
    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.value)){
        alert("El nombre debe contener solo letras");
        nombre.focus();
        return;
    }

    // 2 apellido: obligatorio, solo letras
    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido.value)){
        alert("El apellido debe contener solo letras");
        apellido.focus();
        return;
    }

    if(!/^[\w.+-]+@(gmail|outlook|duocuc)\.(com|cl)$/i.test(correo.value)){
        alert("El correo debe ser de dominio @gmail, @outlook o @duocuc, junto al .com");
        correo.focus();
        return;
    }

    // 4 telefono: obligatorio, solo numeros (con opcion de +56 adelante)
    if(!/^\+?\d{8,12}$/.test(fono.value)){
        alert("El telefono debe contener solo numeros, ejemplo: +56912345678");
        fono.focus();
        return;
    }

    // 5 Calculo de edad exacta considerando día y mes
    let fechaNacimiento = new Date(fenac.value);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        alert("Debes ser mayor de 18 años para registrarte");
        fenac.focus();
        return;
    }

    // 6 especialidad: obligatoria
    if(especialidad.value === ""){
        alert("Debe seleccionar una especialidad de interes");
        especialidad.focus();
        return;
    }

    // 7 modalidad de atencion: obligatorio elegir una opcion
    let modalidadSeleccionada = false;
    for(let i = 0; i < modalidad.length; i++){
        if(modalidad[i].checked){
            modalidadSeleccionada = true;
        }
    }
    if(!modalidadSeleccionada){
        alert("Debe seleccionar una modalidad de atencion");
        modalidad[0].focus();
        return;
    }

    // 8 contraseña: minimo 8 caracteres, mayuscula, minuscula y numero
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(contra.value)){
        alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
        contra.focus();
        return;
    }

    // 9 confirmar contraseña: debe coincidir
    if(confirmar.value !== contra.value){
        alert("Las contraseñas no coinciden");
        confirmar.focus();
        return;
    }

    // si todas las validaciones pasan
    alert("Registro realizado correctamente");
    formulario.reset();
})