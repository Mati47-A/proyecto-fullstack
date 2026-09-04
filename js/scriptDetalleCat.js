// JS de detalle-catalogo.html

// Resalta en el menú la pestaña de la página en la que está el usuario
document.addEventListener("DOMContentLoaded", function () {
    const paginaActual = window.location.pathname.split("/").pop();
    const enlaces = document.querySelectorAll("#menu-principal .enlace-menu");

    enlaces.forEach(function (enlace) {
        if (enlace.getAttribute("href") === paginaActual) {
            enlace.style.backgroundColor = "#1e3a2f";
            enlace.style.color = "#f7f3e9";
        }
    });
});

// ===== Datos de los planes (catálogo NutriVida) =====
// Se guardan en un objeto para poder reutilizar esta misma página de
// detalle con distintos planes, según el parámetro "plan" de la URL.
const planes = {
    "control-peso": {
        nombre: "Plan Control de Peso",
        descripcion: "Seguimiento progresivo con medición periódica y ajuste de dieta cada sesión.",
        precio: 25000,
        imagen: "img/control_de_peso.jpg",
        infoAdicional: "Incluye control de peso y perímetros, plan alimentario personalizado en formato digital y contacto directo con tu nutricionista entre sesiones para resolver dudas."
    },
    "enfermedad-metabolica": {
        nombre: "Plan Enfermedades Metabólicas",
        descripcion: "Acompañamiento coordinado con tu médico tratante para diabetes, hipertensión y similares.",
        precio: 30000,
        imagen: "img/enfermedad_metabolica.jpg",
        infoAdicional: "Trabajamos en conjunto con el médico tratante, revisando exámenes y ajustando el plan alimentario a cada tratamiento. Incluye informe de avance mensual."
    },
    "nutricion-deportiva": {
        nombre: "Plan Nutrición Deportiva",
        descripcion: "Energía y recuperación para tus entrenamientos, adaptado a tu disciplina.",
        precio: 28000,
        imagen: "img/nutricion_deportiva.jpg",
        infoAdicional: "Incluye plan de carga de energía según tu carga de entrenamiento, recomendaciones de hidratación y ajuste según etapa de competencia."
    },
    "alimentacion-vegetariana": {
        nombre: "Plan Vegetariano y Vegano",
        descripcion: "Planes completos sin productos de origen animal, cuidando cada nutriente esencial.",
        precio: 26000,
        imagen: "img/alimentacion_vegetariana.png",
        infoAdicional: "Incluye control de nutrientes críticos (vitamina B12, hierro, proteína) y recetario base con opciones 100% vegetales."
    }
};

// Formatea un número como precio en pesos chilenos, p.ej. 25000 -> "$25.000"
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

// --- Cargar el plan según el parámetro ?plan= de la URL ---
const parametros = new URLSearchParams(window.location.search);
const idPlan = parametros.get("plan");
const plan = planes[idPlan] || planes["control-peso"]; // plan por defecto

document.getElementById("detalle-img").src = plan.imagen;
document.getElementById("detalle-img").alt = plan.nombre;
document.getElementById("detalle-nombre").textContent = plan.nombre;
document.getElementById("detalle-descripcion").textContent = plan.descripcion;
document.getElementById("detalle-precio").textContent = formatearPrecio(plan.precio);
document.getElementById("info-adicional").textContent = plan.infoAdicional;
document.title = plan.nombre + " — NutriVida";

// --- Mostrar / ocultar información adicional ---
const btnInfo = document.getElementById("btn-info");
const infoAdicional = document.getElementById("info-adicional");

btnInfo.addEventListener("click", function () {
    const visible = infoAdicional.classList.toggle("visible");
    btnInfo.textContent = visible ? "Ocultar información adicional" : "Ver información adicional";
});

// --- Selector de cantidad de sesiones y cálculo del total ---
const spanCantidad = document.getElementById("cantidad-sesiones");
const totalPrecio = document.getElementById("total-precio");
let sesiones = 1;

function actualizarTotal() {
    spanCantidad.textContent = sesiones;
    totalPrecio.textContent = formatearPrecio(plan.precio * sesiones);
}

document.getElementById("btn-sumar").addEventListener("click", function () {
    sesiones++;
    actualizarTotal();
});

document.getElementById("btn-restar").addEventListener("click", function () {
    if (sesiones > 1) {
        sesiones--;
        actualizarTotal();
    }
});

// --- Botón de reservar: muestra un mensaje observable al usuario ---
document.getElementById("btn-reservar").addEventListener("click", function () {
    const mensaje = document.getElementById("mensaje-reserva");
    mensaje.textContent =
        "¡Listo! Reservaste " + sesiones + " sesión(es) de \"" + plan.nombre +
        "\" por un total de " + formatearPrecio(plan.precio * sesiones) + ".";
});
