if (document.body.classList.contains("dashboard-page")) {
    const imagenes = [
        'assets/img20.jpg',
        'assets/img21.jpg',
        'assets/img22.jpg',
        'assets/img23.jpg'
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