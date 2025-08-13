document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MATRIX BACKGROUND SETUP ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // --- SPEED CONTROL ---
    // Change this number to adjust the speed. Lower is slower.
    const fps = 15;
    const frameInterval = 1000 / fps;
    let lastFrameTime = 0;


    const characters = '01';
    const charArray = characters.split('');
    const fontSize = 14;
    let columns;
    let drops;

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = fontSize + 'px ' + getComputedStyle(document.body).fontFamily;

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function startMatrixAnimation() {
        setupCanvas();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        lastFrameTime = performance.now(); // Reset time for the new loop
        animate();
    }
    
    // MODIFIED: Animation loop with speed control
    function animate(currentTime) {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = currentTime - lastFrameTime;

        if (elapsed > frameInterval) {
            lastFrameTime = currentTime - (elapsed % frameInterval);
            drawMatrix();
        }
    }
    
    window.addEventListener('resize', startMatrixAnimation);


    // --- 2. DATA STORAGE ---
    const siteData = {
        en: {
            nav: { about: "// ABOUT", skills: "// SKILLS", experience: "// EXPERIENCE", contact: "// CONTACT" },
            hero: { scroll: "SCROLL TO EXPLORE" },
            titles: { about: "[ ABOUT ME ]", skills: "[ TECHNICAL TOOLBOX ]", experience: "[ PROFESSIONAL TRAJECTORY ]", contact: "[ GET IN TOUCH ]" },
            about: "Software developer focusing on mobile applications (Flutter) and web. Passionate about solving technical challenges and learning new technologies to build efficient and user-friendly products.",
            contact: "I'm currently open to new opportunities. Feel free to reach out.",
            typed: ["Mobile App Developer (Flutter)", "Familiar with Network and Linux Concepts", "Creator & Problem Solver"],
            skills: [
                {
                    category: "Programming Languages",
                    list: [ { name: 'Python', level: 80 }, { name: 'Dart', level: 90 }, { name: 'Java', level: 50 }, { name: 'SQL', level: 60 } ]
                },
                {
                    category: "Frameworks & Platforms",
                    list: [ { name: 'Flutter', level: 90 }, { name: 'Django', level: 50 }, { name: 'WordPress', level: 60 } ]
                },
                {
                    category: "Tools & Operating Systems",
                    list: [ { name: 'Git & Version Control', level: 85 }, { name: 'Linux', level: 80 }, { name: 'Adobe Photoshop', level: 70 } ]
                },
                {
                    category: "Networking & Infrastructure",
                    list: [ { name: 'Network+ Concepts', level: 75 }, { name: 'Virtual Machines', level: 70 }, { name: 'Hardware Assembly', level: 65 } ]
                }
            ],
            experience: [
                { title: "B.Sc. Computer Science", location: "Islamic Azad University of Tabriz (2019 - 2025)", details: [] },
                { title: "WordPress Developer & Admin", location: "Ario Barzan Fara Gostar Co.", details: ["Full development of the company website (abarzan.com) using WordPress.", "Responsible for content management, plugin updates, and site maintenance."] },
                { title: "IT Support Intern (Help Desk)", location: "Polynar Co. (2023)", details: ["Learned the processes of a professional network and support team.", "Assembled computers, installed software, and performed system troubleshooting."] },
                { title: "Graphic Design Intern", location: "Pazineh Studio (2018)", details: ["Created graphic designs for packaging and digital content using Adobe Photoshop."] }
            ]
        },
        de: {
            nav: { about: "// ÜBER MICH", skills: "// FÄHIGKEITEN", experience: "// WERDEGANG", contact: "// KONTAKT" },
            hero: { scroll: "SCROLLEN ZUM ENTDECKEN" },
            titles: { about: "[ ÜBER MICH ]", skills: "[ TECHNISCHE WERKZEUGE ]", experience: "[ BERUFLICHER WERDEGANG ]", contact: "[ KONTAKT AUFNEHMEN ]" },
            about: "Softwareentwickler mit Fokus auf mobile Anwendungen (Flutter) und Web. Begeistert von der Lösung technischer Herausforderungen und dem Erlernen neuer Technologien, um effiziente und benutzerfreundliche Produkte zu entwickeln.",
            contact: "Ich bin derzeit offen für neue Möglichkeiten. Zögern Sie nicht, mich zu kontaktieren.",
            typed: ["Mobile App Entwickler (Flutter)", "Vertraut mit Netzwerk- und Linux-Konzepten", "Schöpfer & Problemlöser"],
            skills: [
                {
                    category: "Programmiersprachen",
                    list: [ { name: 'Python', level: 80 }, { name: 'Dart', level: 90 }, { name: 'Java', level: 50 }, { name: 'SQL', level: 60 } ]
                },
                {
                    category: "Frameworks & Plattformen",
                    list: [ { name: 'Flutter', level: 90 }, { name: 'Django', level: 50 }, { name: 'WordPress', level: 60 } ]
                },
                {
                    category: "Tools & Betriebssysteme",
                    list: [ { name: 'Git & Versionskontrolle', level: 85 }, { name: 'Linux', level: 80 }, { name: 'Adobe Photoshop', level: 70 } ]
                },
                {
                    category: "Netzwerk & Infrastruktur",
                    list: [ { name: 'Netzwerk+ Konzepte', level: 75 }, { name: 'Virtuelle Maschinen', level: 70 }, { name: 'Hardware-Montage', level: 65 } ]
                }
            ],
            experience: [
                { title: "B.Sc. Informatik", location: "Islamische Azad-Universität Täbris (2019 - 2025)", details: [] },
                { title: "WordPress-Entwickler & Admin", location: "Ario Barzan Fara Gostar Co.", details: ["Vollständige Entwicklung der Unternehmenswebsite (abarzan.com) mit WordPress.", "Verantwortlich für Content-Management, Plugin-Updates und Website-Wartung."] },
                { title: "Praktikant im technischen Support", location: "Polynar Co. (2023)", details: ["Erlernen der Prozesse eines professionellen Netzwerk- und Support-Teams.", "Computer-Montage, Software-Installation und System-Fehlerbehebung."] },
                { title: "Praktikant im Grafikdesign", location: "Pazineh Studio (2018)", details: ["Erstellung von Grafikdesigns für Verpackungen und digitale Inhalte mit Adobe Photoshop."] }
            ]
        },
        fa: {
            nav: { about: "// درباره من", skills: "// مهارت‌ها", experience: "// سوابق", contact: "// تماس" },
            hero: { scroll: "برای کاوش اسکرول کنید" },
            titles: { about: "[ درباره من ]", skills: "[ جعبه ابزار فنی ]", experience: "[ مسیر حرفه‌ای ]", contact: "[ ارتباط با من ]" },
            about: "توسعه‌دهنده نرم‌افزار با تمرکز بر اپلیکیشن‌های موبایل (فلاتر) و وب. علاقه‌مند به حل چالش‌های فنی و یادگیری تکنولوژی‌های جدید برای ساخت محصولات کارآمد و کاربرپسند.",
            contact: "در حال حاضر آماده به کار و پذیرای فرصت‌های جدید هستم. برای همکاری با من در تماس باشید.",
            typed: ["توسعه‌دهنده اپلیکیشن موبایل (فلاتر)", "آشنا به مفاهیم شبکه و لینوکس", "خالق و حلال مشکلات"],
            skills: [
                {
                    category: "زبان‌های برنامه‌نویسی",
                    list: [ { name: 'Python', level: 80 }, { name: 'Dart', level: 90 }, { name: 'Java', level: 50 }, { name: 'SQL', level: 60 } ]
                },
                {
                    category: "فریم‌ورک‌ها و پلتفرم‌ها",
                    list: [ { name: 'Flutter', level: 90 }, { name: 'Django', level: 50 }, { name: 'WordPress', level: 60 } ]
                },
                {
                    category: "ابزارها و سیستم‌عامل",
                    list: [ { name: 'Git و کنترل نسخه', level: 85 }, { name: 'لینوکس', level: 80 }, { name: 'ادوبی فتوشاپ', level: 70 } ]
                },
                {
                    category: "شبکه و زیرساخت",
                    list: [ { name: 'مفاهیم نتورک‌پلاس', level: 75 }, { name: 'ماشین‌های مجازی', level: 70 }, { name: 'اسمبل سخت‌افزار', level: 65 } ]
                }
            ],
            experience: [
                { title: "کارشناسی کامپیوتر", location: "دانشگاه آزاد اسلامی تبریز (۱۳۹۸ - ۱۴۰۴)", details: [] },
                { title: "توسعه‌دهنده و مدیر وب‌سایت وردپرس", location: "شرکت آریو برزن فرا گستر", details: ["توسعه کامل وب‌سایت شرکتی (abarzan.com) با استفاده از وردپرس.", "مسئول مدیریت محتوا، به‌روزرسانی پلاگین‌ها و نگهداری از سایت."] },
                { title: "کارآموز پشتیبانی فنی (Help Desk)", location: "شرکت پلی نار (۱۴۰۲)", details: ["آشنایی با فرآیندهای تیم حرفه‌ای شبکه و پشتیبانی.", "اسمبل کردن کامپیوتر، نصب نرم‌افزار و عیب‌یابی سیستم‌ها."] },
                { title: "کارآموز طراحی گرافیک", location: "پازینه استودیو (۱۳۹۷)", details: ["انجام امور طراحی گرافیکی برای بسته‌بندی و محتوای دیجیتال با Adobe Photoshop."] }
            ]
        }
    };

    // --- 3. ELEMENT SELECTORS ---
    const langButtons = document.querySelectorAll('.lang-switcher button');
    let typedInstance;

    // --- 4. DYNAMIC CONTENT GENERATION ---

    function generateSkills(lang) {
        const skillsGrid = document.querySelector('.skills-grid');
        const data = siteData[lang].skills;
        skillsGrid.innerHTML = ''; // Clear existing skills

        data.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';

            let skillsHTML = '';
            category.list.forEach(skill => {
                skillsHTML += `
                    <div class="skill-bar">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}%</span>
                        </div>
                        <div class="skill-progress-bar">
                            <div class="skill-progress-fill" data-level="${skill.level}"></div>
                        </div>
                    </div>
                `;
            });

            categoryDiv.innerHTML = `<h4>${category.category}</h4>${skillsHTML}`;
            skillsGrid.appendChild(categoryDiv);
        });
    }

    function generateExperience(lang) {
        const timeline = document.querySelector('.timeline');
        const data = siteData[lang].experience;
        timeline.innerHTML = ''; // Clear existing experience

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'timeline-item';

            let detailsHTML = '';
            if (item.details.length > 0) {
                detailsHTML = '<ul>';
                item.details.forEach(detail => {
                    detailsHTML += `<li>${detail}</li>`;
                });
                detailsHTML += '</ul>';
            }

            itemDiv.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.location}</p>
                ${detailsHTML}
            `;
            timeline.appendChild(itemDiv);
        });
    }

    // --- 5. LANGUAGE & CONTENT UPDATING ---

    function updateTextContent(lang) {
        const data = siteData[lang];
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const [section, subkey] = key.split('_');
            
            if (data[section] && data[section][subkey]) {
                element.textContent = data[section][subkey];
            } else if (data.titles && data.titles[key]) {
                 element.textContent = data.titles[key];
            } else if (key === 'hero_scroll') {
                element.textContent = data.hero.scroll;
            } else if (key === 'hero_summary') {
                element.textContent = data.about;
            } else if (key.startsWith('nav_')) {
                element.textContent = data.nav[key.substring(4)];
            } else if (key.startsWith('section_title_')) {
                element.textContent = data.titles[key.substring(14)];
            } else if (key === 'contact_intro') {
                element.textContent = data.contact;
            }
        });
    }

    function initTyped(lang) {
        if (typedInstance) {
            typedInstance.destroy();
        }
        typedInstance = new Typed('#typed-title', {
            strings: siteData[lang].typed,
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
        });
    }

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

        updateTextContent(lang);
        generateSkills(lang);
        generateExperience(lang);
        initTyped(lang);

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        const skillsPanel = document.querySelector('#skills');
        if (skillsPanel.classList.contains('visible')) {
            animateSkillBars();
        }
    }

    // --- 6. ANIMATIONS & EFFECTS ---

    function animateSkillBars() {
        document.querySelectorAll('.skill-progress-fill').forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.dataset.level + '%';
            }, 100);
        });
    }

    document.body.addEventListener('mousemove', e => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.panel').forEach(panel => {
        observer.observe(panel);
    });

    // --- 7. INITIALIZATION ---

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    startMatrixAnimation();
    setLanguage('en');
});
