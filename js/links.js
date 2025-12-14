// JS
const agregarBtn = document.getElementById('agregar');
const listaLinks = document.getElementById('lista-links');
const tituloInput = document.getElementById('titulo');
const urlInput = document.getElementById('url');
const error = document.getElementById('error');
const containerClipboard = document.querySelector('.clipboard-container');

// estado inicial
let links = JSON.parse(localStorage.getItem('misLinks')) || [];

// Normalizar y validar URL
function normalizeURL(url) {
    let urlFinal = url.trim();

    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(urlFinal)) {
        urlFinal = 'https://' + urlFinal;
    }

    try {
        const link = new URL(urlFinal);
        if (link.protocol === 'http:' || link.protocol === 'https:') {
            return urlFinal;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

// Mostrar la lista de links
function mostrarLinks() {
    listaLinks.innerHTML = '';

    if (!links.length) {
        const li = document.createElement('li');
        li.textContent = 'No hay links guardados. Añade uno arriba.';
        li.className = 'links-empty';
        listaLinks.appendChild(li);
        btnRemoveAll.style.display = 'none';
        return;
    }

    btnRemoveAll.style.display = 'block';

    links.forEach((link, index) => {
        const li = document.createElement('li');

        // Contenedor clickable
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.titulo;
        a.className = 'link-anchor';

        // Botón eliminar
        const btnRemove = document.createElement('button');
        btnRemove.textContent = '×';
        btnRemove.type = 'button';
        btnRemove.className = 'btn-remove';

        // Armar li
        li.appendChild(a);
        li.appendChild(btnRemove);
        listaLinks.appendChild(li);

        // Eliminar link
        btnRemove.addEventListener('click', () => {
            if (!confirm(`¿Quieres eliminar "${link.titulo}"?`)) return;
            links.splice(index, 1);
            localStorage.setItem('misLinks', JSON.stringify(links));
            mostrarLinks();
        });

        // Abrir link al click, excepto botón
        li.addEventListener('click', (ev) => {
            if (ev.target === btnRemove) return;
            window.open(link.url, '_blank', 'noopener');
        });
    });
}

// Añadir nuevo link
function agregarLink() {
    const titulo = tituloInput.value.trim();
    const urlTrimmed = urlInput.value.trim();

    if (!titulo || !urlTrimmed) {
        error.textContent = 'Escribe un título y una URL válida.';
        error.style.display = 'block';
        return;
    }

    const urlValidada = normalizeURL(urlTrimmed);
    if (!urlValidada) {
        error.textContent = 'Introduce una URL válida (ej: https://ejemplo.com).';
        error.style.display = 'block';
        return;
    }

    error.textContent = '';
    error.style.display = 'none';

    const nuevoLink = { titulo, url: urlValidada };
    links.unshift(nuevoLink);
    localStorage.setItem('misLinks', JSON.stringify(links));

    tituloInput.value = '';
    urlInput.value = '';

    mostrarLinks();
}

// Borrar todo
function clearAll() {
    if (!confirm('¿Quieres borrar todos los links?')) return;
    links = [];
    localStorage.removeItem('misLinks');
    mostrarLinks();
}

// botón "Borrar todo" dentro del container inputs-links
const btnRemoveAll = document.createElement('button');
btnRemoveAll.textContent = 'Borrar todo';
btnRemoveAll.type = 'button';
btnRemoveAll.className = 'btn-remove-all';
btnRemoveAll.addEventListener('click', clearAll);
containerClipboard.appendChild(btnRemoveAll);

// eventos
agregarBtn.addEventListener('click', (e) => {
  e.preventDefault();
  agregarLink();
});

// permitir Enter en los inputs
[tituloInput, urlInput].forEach(input => {
  input.addEventListener('keydown', (ev)=> {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      agregarLink();
    }
  });
});

// inicializar
mostrarLinks();

const imagenes = [
    '../assets/img15.jpg',
    '../assets/img16.jpg',
    '../assets/img17.jpg',
    '../assets/img18.jpg'
];

function cambiarFondo() {
    if (window.innerWidth > 768) { // solo para pantallas grandes
        const indice = Math.floor(Math.random() * imagenes.length);
        document.body.style.backgroundImage = `url('${imagenes[indice]}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
        document.body.style.backgroundImage = ''; // eliminar fondo dinámico en tablet/móvil
    }
}

cambiarFondo();
setInterval(cambiarFondo, 60000);