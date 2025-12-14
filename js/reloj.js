function actualizarHora() {
    const horaElemento = document.getElementById('hora');
    const fechaElemento = document.getElementById('fecha');
    const fraseElemento = document.getElementById('frase');

    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const year = String(ahora.getFullYear());

    if (horaElemento) horaElemento.textContent = `${horas}:${minutos}:${segundos}`;
    if (fechaElemento) fechaElemento.textContent = `${dia}/${mes}/${year}`;

    // solo actualizar frase si existe el elemento
    if (fraseElemento) {
        let frase = '';
        if (horas >= 0 && horas < 7) {
            frase = "¿Pero qué haces despierto a estas horas? Mañana, más 😴 ";
        } else if (horas >= 7 && horas < 12) {
            frase = "¡Es hora de levantarse! El menú de hoy incluye: desayuno, café y ¡mucho código! ☕ 💻";
        } else if (horas >= 12 && horas < 14) {
            frase = "Creo que deberías tomarte otro café ☕";
        } else if (horas >= 14 && horas < 16) {
            frase = "La web necesita código y tu estómago, comida. ¡Todo el mundo a la mesa!";
        } else if (horas >= 16 && horas < 18) {
            frase = "No hay mejor manera de combatir una digestión lenta que programar un poquito. Y si llevas menos de cuatro, quizás es momento de un cafecito más ☕ ☕";
        } else if (horas >= 18 && horas < 22) {
            frase = "Quizás es momento de parar, que no por echarle más horas heredarás la empresa 😉";
        } else {
            frase = "¿Has visto el reloj? Ha llegado la hora de descansar 🕘";
        }
        fraseElemento.textContent = frase;
    }
}

// Inicialización automática al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarHora();
    setInterval(actualizarHora, 1000);
});

if (document.body.classList.contains("page-reloj")) {
    const imagenes = [
        '../assets/img1.jpg',
        '../assets/img2.jpg',
        '../assets/img3.jpg',
        '../assets/img4.jpg',
        '../assets/img5.jpg',
        '../assets/img6.jpg',
        '../assets/img7.jpg',
        '../assets/img8.jpg',
        '../assets/img9.jpg'
    ];

    function cambiarFondo() {
        const indice = Math.floor(Math.random() * imagenes.length);
        document.body.style.backgroundImage = `url('${imagenes[indice]}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';  
    }

    cambiarFondo();
    setInterval(cambiarFondo, 60000);
}

