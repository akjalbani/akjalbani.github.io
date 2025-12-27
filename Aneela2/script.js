/**
 * Dr. Aneela Yasmin - Teaching Portfolio
 * Interactive JavaScript Features
 */

// ============================================
// Evidence Data for Lightbox
// ============================================
const evidenceData = {
    'udl-evidence': {
        images: [
            {
                src: 'images/sotl-udl-page.png',
                title: 'UDL Readiness Study',
                description: 'Mixed-methods study analyzing how VET teachers integrate Universal Design for Learning into lesson planning. Shows the perception-practice gap in UDL implementation and a proposed VET UDL Planning Cycle model.'
            }
        ]
    },
    'roles-evidence': {
        images: [
            {
                src: 'images/role-cards-page.png',
                title: 'Lab Group Role Cards - Part 1',
                description: 'Structured group roles designed for equitable participation in collaborative laboratory work. Includes Technician and Recorder roles with clear responsibilities and rotation guidelines.'
            },
            {
                src: 'images/role-cards-page2.png',
                title: 'Lab Group Role Cards - Part 2',
                description: 'Calculator and Spokesperson roles with detailed responsibilities. Each role is designed to promote balanced engagement and reduce dominance by high-achieving students.'
            }
        ]
    },
    'lln-evidence': {
        images: [
            {
                src: 'images/lln-safety-page.png',
                title: 'Modified Safety Sheet for EAL Learners',
                description: 'Example of LLN-embedded safety documentation for Thin Layer Chromatography. Features plain-language protocols, visual guides, and simplified instructions to maintain rigor while improving accessibility for diverse learners.'
            }
        ]
    },
    'ai-evidence': {
        images: [
            {
                src: 'images/ai-creativity-page.png',
                title: 'AI and Creativity in Science Education',
                description: 'Research presentation from ASEF Higher Education Innovation Lab exploring how generative AI impacts student creativity. Features the ISAR-Informed AI-Creativity Integration Framework (ACIF) with principles for transforming AI from shortcuts into amplifiers for the thinking process.'
            }
        ]
    },
    'sotl-summary': {
        images: [
            {
                src: 'images/sotl-summary-page.png',
                title: 'SoTL Projects Summary',
                description: 'Comprehensive overview of all Scholarship of Teaching and Learning projects including findings, outcomes, challenges, adaptations, next steps, and alignment with university lecturer role requirements.'
            }
        ]
    },
    'asef-cert': {
        images: [
            {
                src: 'images/asef-certificate.jpeg',
                title: 'ASEF Higher Education Innovation Lab Certificate',
                description: 'Certificate of completion for the 6th ASEF Higher Education Innovation Laboratory (May-July 2025), focusing on "Universities\' Role in Developing Skills for an AI-Powered Future." Issued by Asia-Europe Foundation in collaboration with Fudan University, De La Salle University, and Pavol Jozef Šafárik University.'
            }
        ]
    },
    'asef-presentation': {
        images: [
            {
                src: 'images/asef-presentation.jpeg',
                title: 'AI Creativity Paradox Presentation',
                description: 'Presentation details for "AP40: The AI Creativity Paradox: Is AI Becoming a Shortcut or an Amplifier for the Thinking Process?" presented at Pavol Jozef Šafárik University, Košice, Slovakia (December 2-5, 2025).'
            }
        ]
    },
    'coursera-cert': {
        images: [
            {
                src: 'images/coursera-certificate.png',
                title: 'Generative AI for Educators Specialization',
                description: 'Coursera specialization certificate for "Generative AI for Educators & Teachers" by Dr. Jules White. Focuses on innovative techniques for using ChatGPT and generative AI to enhance rather than harm education.'
            }
        ]
    },
    'asm-cert': {
        images: [
            {
                src: 'images/asm-membership.png',
                title: 'American Society for Microbiology Membership',
                description: '2025 Certificate of Membership as a Global Outreach - Contributing Member of the American Society for Microbiology, demonstrating active engagement with the global scientific community.'
            }
        ]
    }
};

// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Lightbox
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxDescription = document.getElementById('lightbox-description');

let currentEvidence = null;
let currentImageIndex = 0;

function openLightbox(evidenceId) {
    const evidence = evidenceData[evidenceId];
    if (!evidence) return;
    
    currentEvidence = evidence;
    currentImageIndex = 0;
    
    updateLightboxContent();
    
    if (evidence.images.length > 1) {
        lightbox.classList.add('has-multiple');
    } else {
        lightbox.classList.remove('has-multiple');
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentEvidence = null;
    currentImageIndex = 0;
}

function navigateLightbox(direction) {
    if (!currentEvidence || currentEvidence.images.length <= 1) return;
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentEvidence.images.length - 1;
    } else if (currentImageIndex >= currentEvidence.images.length) {
        currentImageIndex = 0;
    }
    
    updateLightboxContent();
}

function updateLightboxContent() {
    if (!currentEvidence) return;
    
    const currentImage = currentEvidence.images[currentImageIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.title;
    
    lightboxDescription.innerHTML = `
        <h3>${currentImage.title}</h3>
        <p>${currentImage.description}</p>
        ${currentEvidence.images.length > 1 ? `<p class="lightbox-counter">${currentImageIndex + 1} / ${currentEvidence.images.length}</p>` : ''}
    `;
}

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.section-header, .pillar, .project-card, .certification-card, .service-item, .theme-card, .response-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .lightbox-counter {
        margin-top: 1rem;
        font-size: 0.875rem;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// ============================================
// Print Portfolio Function
// ============================================
function printPortfolio() {
    window.print();
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current nav link on load
    highlightNavLink();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Make functions globally available
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
