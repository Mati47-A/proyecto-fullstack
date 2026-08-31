let formulario = document.getElementById("acceso");
let correo = document.getElementById("correo");
let contra = document.getElementById("contrasena");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1 correo
    if(!/^[\w.+-]+@(gmail|outlook|duocuc)\.(com|cl)$/i.test(correo.value)){
        alert("El correo debe ser de dominio @gmail, @outlook o @duocuc, junto al .com");
        correo.focus();
        return;
    }

    // 2 contra
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(contra.value)){
        alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
        contra.focus();
        return;
    }

    // si todas las validaciones pasan
    alert("formulario enviado correctamente");
    formulario.reset();
})