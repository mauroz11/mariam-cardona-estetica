/* ==========================================================================
   MARIAN CARDONA ESTÉTICA INTEGRAL - COMPORTAMIENTOS INTERACTIVOS (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Barra de Navegación Sticky & Opacidad en Scroll
    const header = document.querySelector('.header-nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Menú de Navegación Móvil (Hamburguesa)
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Cerrar menú al hacer clic en enlaces en móvil
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-trigger)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // 3. Toggles de Submenús en Móviles
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // 4. Animación al Hacer Scroll (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    // 5. Acordeón de Preguntas Frecuentes (FAQ Accordion)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const isOpen = currentItem.classList.contains('active');
            
            // Cerrar todos los demás
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir el actual si no estaba abierto
            if (!isOpen) {
                currentItem.classList.add('active');
            }
        });
    });

    // 6. Slider Interactivo Antes/Después (Si existe en la página)
    const sliderContainer = document.querySelector('.before-after-slider');
    if (sliderContainer) {
        const imgAfter = sliderContainer.querySelector('.img-after');
        const handle = sliderContainer.querySelector('.slider-handle');
        
        let isDragging = false;

        const updateSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            let positionX = clientX - rect.left;
            
            // Limitar dentro del contenedor
            if (positionX < 0) positionX = 0;
            if (positionX > rect.width) positionX = rect.width;
            
            const percentage = (positionX / rect.width) * 100;
            imgAfter.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Eventos Mouse
        handle.addEventListener('mousedown', () => { isDragging = true; });
        window.addEventListener('mouseup', () => { isDragging = false; });
        
        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Eventos Táctiles (Móvil)
        handle.addEventListener('touchstart', () => { isDragging = true; });
        window.addEventListener('touchend', () => { isDragging = false; });
        
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });
        
        // Soporte de clic directo en el slider
        sliderContainer.addEventListener('click', (e) => {
            if (e.target === handle) return;
            updateSlider(e.clientX);
        });
    }

    // 7. Enlace de WhatsApp Dinámico para Reservas
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Crear mensaje para WhatsApp
            const text = `Hola Marian Cardona Estética Integral,\n\nMi nombre es *${name}* (${phone}). Deseo realizar una reserva para el servicio de: *${service}*.\n\n*Mensaje adicional:*\n${message}`;
            const encodedText = encodeURIComponent(text);
            
            // Número de WhatsApp (puedes configurar el número del usuario)
            const whatsappNumber = "573216891054"; // Código de país 57 (Colombia)
            
            // Abrir WhatsApp en nueva pestaña
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
        });
    }
});
