document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP & CONFIGURATION ---
    const config = {
        matrixFps: 15,
        matrixFontSize: 14,
        matrixCharacters: '01'
    };

    const elements = {
        canvas: document.getElementById('matrix-canvas'),
        langButtons: document.querySelectorAll('.lang-switcher button'),
        contentSections: document.querySelectorAll('.panel'),
        skillsGrid: document.querySelector('.skills-grid'),
        timeline: document.querySelector('.timeline'),
        projectsGrid: document.querySelector('.projects-grid'),
        typedTitle: document.querySelector('#typed-title')
    };

    let typedInstance;
    
    // --- 2. BACKGROUND ANIMATIONS ---
    const matrix = {
        ctx: elements.canvas.getContext('2d'),
        columns: 0,
        drops: [],
        lastFrameTime: 0,
        animationFrameId: null,

        setup() {
            elements.canvas.width = window.innerWidth;
            elements.canvas.height = window.innerHeight;
            this.columns = Math.floor(elements.canvas.width / config.matrixFontSize);
            this.drops = Array(this.columns).fill(1);
        },

        draw() {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // UPDATED - Made characters more transparent
            this.ctx.font = `${config.matrixFontSize}px ${getComputedStyle(document.body).fontFamily}`;
            
            for (let i = 0; i < this.drops.length; i++) {
                const text = config.matrixCharacters[Math.floor(Math.random() * config.matrixCharacters.length)];
                this.ctx.fillText(text, i * config.matrixFontSize, this.drops[i] * config.matrixFontSize);
                if (this.drops[i] * config.matrixFontSize > elements.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }
        },

        animate(currentTime = 0) {
            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
            const elapsed = currentTime - this.lastFrameTime;
            const frameInterval = 1000 / config.matrixFps;

            if (elapsed > frameInterval) {
                this.lastFrameTime = currentTime - (elapsed % frameInterval);
                this.draw();
            }
        },

        start() {
            this.setup();
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
            this.animate();
        }
    };

    function handleMouseMove(e) {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

    // --- 3. DATA HANDLING ---
    async function fetchLanguageData(lang) {
        try {
            const response = await fetch(`${lang}.json?v=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`Network response error`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch ${lang}.json:`, error);
            return null;
        }
    }

    // --- 4. DYNAMIC CONTENT RENDERING ---
    function renderSkills(data) {
        elements.skillsGrid.innerHTML = data.skills.map(category => `
            <div class="skill-category">
                <h4>${category.category}</h4>
                ${category.list.map(skill => `
                    <div class="skill-bar">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}%</span>
                        </div>
                        <div class="skill-progress-bar">
                            <div class="skill-progress-fill" data-level="${skill.level}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    function renderExperience(data) {
        elements.timeline.innerHTML = data.experience.map(item => `
            <div class="timeline-item">
                <h4>${item.title}</h4>
                <p>${item.location}</p>
                ${item.details && item.details.length > 0 ? `<ul>${item.details.map(detail => `<li>${detail}</li>`).join('')}</ul>` : ''}
            </div>
        `).join('');
    }

    function renderProjects(data) {
        if (!elements.projectsGrid) return; // Failsafe
        elements.projectsGrid.innerHTML = data.projects.map(project => `
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-card">
                <div class="project-info">
                    <h4 class="project-title">${project.name}</h4>
                    <p class="project-platform">${project.platform}</p>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="project-link-icon">→</div>
            </a>
        `).join('');
    }

    function updateTextContent(data) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const [section, subkey] = key.split('_');
            
            let text = '';
            if (key.startsWith('nav_')) text = data.nav[key.substring(4)];
            else if (key.startsWith('section_title_')) text = data.titles[key.substring(14)];
            else if (data[section] && data[section][subkey]) text = data[section][subkey];
            else if (key === 'hero_summary') text = data.about;
            else if (key === 'contact_intro') text = data.contact;
            
            if (text) element.textContent = text;
        });
    }

    function initTyped(data) {
        if (typedInstance) typedInstance.destroy();
        typedInstance = new Typed(elements.typedTitle, {
            strings: data.typed,
            typeSpeed: 50, backSpeed: 25, backDelay: 2000,
            startDelay: 500, loop: true, smartBackspace: true,
        });
    }

    // --- 5. MAIN CONTROLLER ---
    async function setLanguage(lang) {
        const data = await fetchLanguageData(lang);
        if (!data) {
            alert('Failed to load language content. Please check your JSON files and try again.');
            return;
        }

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

        updateTextContent(data);
        renderSkills(data);
        renderExperience(data);
        renderProjects(data);
        initTyped(data);

        elements.langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    }

    // --- 6. SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    entry.target.querySelectorAll('.skill-progress-fill').forEach(bar => {
                        setTimeout(() => bar.style.width = `${bar.dataset.level}%`, 100);
                    });
                }
            }
        });
    }, { threshold: 0.2 });

    // --- 7. INITIALIZATION & EVENT LISTENERS ---
    window.addEventListener('resize', () => matrix.start());
    document.body.addEventListener('mousemove', handleMouseMove);
    elements.langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
    elements.contentSections.forEach(panel => observer.observe(panel));

    matrix.start();
    setLanguage('en'); // Load the default language
});
