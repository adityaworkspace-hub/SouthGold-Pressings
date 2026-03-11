document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if(menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 4. Parallax effect for standard vertical scrolling elements
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            let speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // 5. 8D / 3D TILT Parallax Mouse Move effect
    const tiltCards = document.querySelectorAll('.tilt-3d');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Mouse position relative to the element
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            // Center of the element
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation. Adjust multiplier for intensity.
            // Using max 20 degrees for an intense "8D" pop
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset position on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });

    // 6. Floating Mouse Parallax for Background Shapes
    document.addEventListener("mousemove", (e) => {
        document.querySelectorAll('.mouse-parallax').forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.05;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // 7. Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const emailInput = document.getElementById('emailInput');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailRegex.test(emailInput.value)) {
                event.preventDefault(); 
                emailError.style.display = 'block';
                emailInput.style.borderColor = '#ff4d4d';
            } else {
                emailError.style.display = 'none';
                emailInput.style.borderColor = 'var(--primary-color)';
            }
        });
    }
});
