// Navigation Module
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.initializeNavigation();
    }

    initializeNavigation() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.handleMobileMenu();
        });

        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollTo(targetId);
                
                // Close mobile menu if open
                if (this.navMenu.classList.contains('active')) {
                    this.handleMobileMenu();
                }
            });
        });

        // Update active nav item on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavItem();
        });
    }

    handleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Skills Visualization Module
class SkillsVisualization {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.skillsSection = document.getElementById('skills');
        this.animated = false;
        
        this.initializeSkillsChart();
    }

    initializeSkillsChart() {
        // Intersection Observer for animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkillBars();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        if (this.skillsSection) {
            observer.observe(this.skillsSection);
        }
    }

    animateSkillBars() {
        this.skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }
}

// Project Gallery Module
class ProjectGallery {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.initializeProjectGallery();
    }

    initializeProjectGallery() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                
                // Update active filter button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProjects(category) {
        this.projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    }
}

// Contact Form Module
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.initializeContactForm();
    }

    initializeContactForm() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(this.form);
            
            if (this.validateForm(formData)) {
                const success = await this.submitForm(formData);
                if (success) {
                    this.showMessage('Message sent successfully!', 'success');
                    this.form.reset();
                } else {
                    this.showMessage('Failed to send message. Please try again.', 'error');
                }
            }
        });
    }

    validateForm(formData) {
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            this.showMessage('Please fill in all fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    async submitForm(formData) {
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
        } catch (error) {
            console.error('Form submission error:', error);
            return false;
        }
    }

    showMessage(message, type) {
        // Create and show message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;

        document.body.appendChild(messageElement);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
}


// Responsive Design Module
class ResponsiveFeatures {
    constructor() {
        this.initializeResponsiveFeatures();
    }

    initializeResponsiveFeatures() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Initialize fade-in animations
        this.initializeFadeInAnimations();
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    initializeFadeInAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements
        const elementsToAnimate = document.querySelectorAll('.section, .project-card, .timeline-item');
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }
}

// Project Details Modal Logic
const projectDetails = {
    ecommerce: {
        title: 'E-Commerce Website',
        description: 'A full-stack e-commerce platform built with React.js and Node.js, featuring user authentication, payment integration, and admin dashboard.',
        tech: ['React.js', 'Node.js', 'MongoDB'],
        screenshots: [
            'images/9.png',
            'https://via.placeholder.com/350x220?text=E-Commerce+2',
            'https://via.placeholder.com/350x220?text=E-Commerce+3',
            'https://via.placeholder.com/350x220?text=E-Commerce+4'
        ],
        features: [
            'User authentication and authorization',
            'Integrated payment gateway',
            'Admin dashboard for product management',
            'Responsive design for all devices',
            'Order tracking and history'
        ]
    },
    taskapp: {
        title: 'Task Management App',
        description: 'A mobile application for task management with features like reminders, categories, and progress tracking. Built using React Native.',
        tech: ['React Native', 'Firebase', 'Redux'],
        screenshots: [
        ]
    },
    dashboard: {
        title: 'Data Visualization Dashboard',
        description: 'An interactive dashboard for data visualization with real-time updates, built using D3.js and Express.js backend.',
        tech: ['D3.js', 'Express.js', 'PostgreSQL'],
        screenshots: [
            'https://via.placeholder.com/350x220?text=Dashboard+1'
        ],
        features: [
            'Real-time data updates',
            'Interactive charts and graphs',
            'Customizable data filters',
            'Export data as CSV or PDF'
        ]
    },
    lms: {
        title: 'LMS Website',
        description: 'A Learning Management System (LMS) platform that enables online course management, student enrollment, assignment submissions, and progress tracking. Features include interactive quizzes, discussion forums, and instructor dashboards for managing course content and student performance.',
        tech: ['React.js', 'Express.js', 'Node.js', 'MongoDB'],
        screenshots: [
            'images/9.png',
            'images/10.png',
            'images/11.png',
            'images/12.png'
        ],
        features: [
            'Online course management and content delivery',
            'Student enrollment and progress tracking',
            'Assignment submission and grading',
            'Interactive quizzes and discussion forums',
            'Instructor dashboard for analytics and management'
        ]
    }
};

function openProjectModal(projectKey) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const details = projectDetails[projectKey];
    if (details) {
        modalBody.innerHTML = `
            <div class="modal-screenshot">
                <div class="modal-gallery">
                    ${details.screenshots.map(src => `<img src="${src}" alt="${details.title} Screenshot" class="modal-gallery-img">`).join('')}
                </div>
            </div>
            <div>
                <h2>${details.title}</h2>
                <p>${details.description}</p>
                <div class="modal-tech-list">
                    <strong style="display:block;margin-bottom:8px;font-size:1.08em;">Used Technologies</strong>
                    ${details.tech.map(t => `<span class='modal-tech'>${t}</span>`).join('')}
                </div>
                <div class="modal-features" style="margin-top:22px;">
                    <strong style="display:block;margin-bottom:8px;font-size:1.08em;">Features of the Project</strong>
                    <ul style="padding-left:18px;">
                        ${details.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } else {
        modalBody.innerHTML = '<p>Project details not found.</p>';
    }
    modal.style.display = 'block';
}

function closeProjectModal() {
    document.getElementById('project-modal').style.display = 'none';
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new Navigation();
        new SkillsVisualization();
        new ProjectGallery();
        new ContactForm();
        new ResumeDownload();
        new ResponsiveFeatures();
        
        // Navigate to project details page
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const projectKey = this.getAttribute('data-project');
                window.location.href = `project-details.html?project=${projectKey}`;
            });
        });
        
        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);