document.addEventListener("DOMContentLoaded", () => {
    const inputLongitud = document.getElementById("longitud");
    const botonGenerar = document.getElementById("generar");
    const resultado = document.getElementById("resultado");
    const botonCopiar = document.getElementById("copiar");
    const error = document.getElementById("error");
    const resultadoContainer = document.getElementById("resultado-container");

    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()-_=+";

    function generarPassword() {
        let longitud = parseInt(inputLongitud.value);

        if(longitud < 12 || longitud > 50){
            error.textContent = "La contraseña debe tener entre 12 y 50 caracteres. Vuelve a intentarlo.";
            error.style.display = "block";
            resultadoContainer.style.display = "none";
            return;
        }

        error.style.display = "none";

        let password = "";

        // Garantizar al menos un carácter de cada tipo
        password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
        password += minusculas[Math.floor(Math.random() * minusculas.length)];
        password += numeros[Math.floor(Math.random() * numeros.length)];
        password += simbolos[Math.floor(Math.random() * simbolos.length)];

        // Completar con caracteres aleatorios hasta la longitud deseada
        const allCharacters = mayusculas + minusculas + numeros + simbolos;
        for(let i = 4; i < longitud; i++){
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }

        // Reordenar caracteres para añadir aleatoriedad con el algoritmo de Fisher-Yates para mezcla aleatoria(todas las permutaciones son equiprobables)
        function mezclarArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {  // El bucle empieza por la ultima posicio y baja hasta i=1
                const j = Math.floor(Math.random() * (i + 1)); //j tiene un valor de 0 a i 
                [arr[i], arr[j]] = [arr[j], arr[i]]; //Intercambia posiciones i y j
            }
            return arr;
        }

        let passwordArray = password.split('');
        passwordArray = mezclarArray(passwordArray);
        password = passwordArray.join('');
        resultado.value = password;
        resultadoContainer.style.display = "flex";
    }

    botonGenerar.addEventListener("click", generarPassword);
    inputLongitud.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            generarPassword();
        }
    });

    botonCopiar.addEventListener("click", () => {
        if(resultado.value) {
            navigator.clipboard.writeText(resultado.value)
            .then(() => alert("Contraseña copiada al portapapeles"))
            .catch(() => alert("Error al copiar la contraseña"));
        }
    });
});

if (document.body.classList.contains("password-page")) {
        const imagenes = [
            '../assets/img10.jpg',
            '../assets/img11.jpg',
            '../assets/img12.jpg',
            '../assets/img13.jpg',
            '../assets/img14.jpg'
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


