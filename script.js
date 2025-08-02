document.addEventListener('DOMContentLoaded', function() {
    // Side Navigation
    const sideNav = document.querySelector('.side-nav');
    const navDots = document.querySelectorAll('.nav-dot');
    const mobileNavBtn = document.querySelector('.mobile-nav-btn');
    const sections = document.querySelectorAll('.section');
    
    // Mobile Navigation Toggle
    mobileNavBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        sideNav.classList.toggle('active');
    });
    
    // Close mobile nav when clicking on a link
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileNavBtn.classList.remove('active');
                sideNav.classList.remove('active');
            }
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Section Detection
    function setActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${currentSection}`) {
                dot.classList.add('active');
            }
        });
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate Skills Progress Bars on Scroll
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = width;
            });
        }
    }
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
    
    // Event Listeners
    window.addEventListener('scroll', setActiveSection);
    window.addEventListener('scroll', animateProgressBars);
    
    // Initialize
    setActiveSection();
    animateProgressBars();
});