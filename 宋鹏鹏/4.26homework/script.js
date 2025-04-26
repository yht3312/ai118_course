// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 主题切换系统
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;
    let isDark = localStorage.getItem('theme') === 'dark';

    const updateTheme = () => {
        body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeSwitch.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeSwitch.addEventListener('click', () => {
        isDark = !isDark;
        updateTheme();
    });
    updateTheme();

    // 移动端导航控制
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 打字机效果
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = '宋鹏鹏';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 150);
            }
        };
        type();
    }

    // 统计数字动画
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 10);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const updateCount = () => {
                        if (current < target) {
                            current += step;
                            stat.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(stat);
                }
            });
        });

        observer.observe(stat);
    });

    // 技能雷达图
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Python', 'NLP', 'CV', '架构设计', '工程化'],
                datasets: [{
                    label: '技术能力',
                    data: [95, 90, 85, 88, 92],
                    backgroundColor: 'rgba(108, 123, 149, 0.2)',
                    borderColor: 'var(--primary-color)',
                    pointBackgroundColor: 'var(--secondary-color)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { display: false },
                        grid: { color: 'rgba(200, 200, 200, 0.2)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 项目过滤系统
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                card.style.display = (filter === 'all' || 
                    card.dataset.category === filter) ? 'block' : 'none';
            });
        });
    });

    // 响应式调整
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});