document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // 设置当前年份
    document.getElementById('year').textContent = new Date().getFullYear();

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // 更新活动导航链接
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 滚动时激活部分和导航
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
                section.classList.add('active');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 触发初始部分动画
    setTimeout(() => {
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            firstSection.classList.add('active');
        }
    }, 1500);

    // 表单提交
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和AJAX提交
            const formData = new FormData(this);
            console.log('表单数据:', Object.fromEntries(formData));
            
            // 显示成功消息
            alert('感谢您的留言！我会尽快回复您。');
            this.reset();
        });
    }
});