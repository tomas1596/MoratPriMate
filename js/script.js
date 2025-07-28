document.addEventListener('DOMContentLoaded', function () {
    const textSlides = document.querySelectorAll('.text-slide');
    const messageSlides = document.querySelectorAll('.message-slide');
    const video = document.getElementById('background-video');
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    let currentTextIndex = 0;
    let currentMessageIndex = 0;
    let isPlaying = false;

    // Cambiar slides
    setInterval(() => {
        textSlides[currentTextIndex].classList.remove('active');
        currentTextIndex = (currentTextIndex + 1) % textSlides.length;
        textSlides[currentTextIndex].classList.add('active');
    }, 10000);

    setInterval(() => {
        messageSlides[currentMessageIndex].classList.remove('active');
        currentMessageIndex = (currentMessageIndex + 1) % messageSlides.length;
        messageSlides[currentMessageIndex].classList.add('active');
    }, 4000);

    // Asegurar que el video esté silenciado (requisito de autoplay)
    video.muted = true;

    // Intentar reproducir video
    video.play().catch(err => {
        console.log('Autoplay video bloqueado:', err);
    });

    // Actualizar botón según estado
    function updateButton() {
        musicToggle.textContent = isPlaying ? '🔊' : '🔇';
        musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
    }

    // Al hacer clic en el botón de música
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play().then(() => {
                isPlaying = true;
            }).catch(err => {
                console.log("Error al reproducir música:", err);
            });
        }
        updateButton();
    });

    // Fallback: reproducir si el usuario toca en cualquier lugar
    document.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                updateButton();
            }).catch(err => {
                console.log("No se pudo iniciar con clic global:", err);
            });
        }
    }, { once: true });

    // Setear volumen
    audio.volume = 0.3;

    // Mostrar estado inicial del botón
    updateButton();
});
