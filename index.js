document.addEventListener('DOMContentLoaded', function() {
    // 导航相关功能
    const nav = document.querySelector('.nav-container');
    const navHeight = nav.offsetHeight;

    // 添加导航菜单平滑滚动效果
    const navLinks = document.querySelectorAll('.nav-menu a, .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // 如果是页面内锚点链接
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // 如果是其他页面链接，则正常跳转
        });
    });

    // 模版分类切换功能
    const categoryItems = document.querySelectorAll('.category-item');
    const templateGrids = document.querySelectorAll('.template-grid');

    // 初始化第一个分类为激活状态
    if (categoryItems.length > 0 && templateGrids.length > 0) {
        categoryItems[0].classList.add('active');
        templateGrids[0].style.display = 'grid';
        // 确保其他模版网格都隐藏
        for (let i = 1; i < templateGrids.length; i++) {
            templateGrids[i].style.display = 'none';
        }
    }

    // 为每个分类添加点击事件
    categoryItems.forEach((category, index) => {
        category.addEventListener('click', () => {
            // 移除所有激活状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            templateGrids.forEach(grid => grid.style.display = 'none');
            
            // 添加新的激活状态
            category.classList.add('active');
            if (templateGrids[index]) {
                templateGrids[index].style.display = 'grid';
            }
        });
    });

    // Tab切换功能
    const tabItems = document.querySelectorAll('.tab-item');
    const featureInfos = document.querySelectorAll('.feature-info');
    let currentTabIndex = 0;

    // 初始化第一个tab和feature-info为活动状态
    if (tabItems.length > 0 && featureInfos.length > 0) {
        tabItems[0].classList.add('active');
        featureInfos[0].classList.add('active');
    }

    // 切换tab和内容
    function switchTab(index) {
        // 移除当前活动状态
        tabItems[currentTabIndex].classList.remove('active');
        featureInfos[currentTabIndex].classList.remove('active');

        // 更新索引
        currentTabIndex = index;

        // 添加新的活动状态
        tabItems[currentTabIndex].classList.add('active');
        featureInfos[currentTabIndex].classList.add('active');
    }

    // 自动轮播
    function autoPlay() {
        if (tabItems.length > 0) {
            const nextIndex = (currentTabIndex + 1) % tabItems.length;
            switchTab(nextIndex);
        }
    }

    // 设置自动轮播间隔
    let autoPlayInterval = setInterval(autoPlay, 2000);

    // 当用户手动点击tab时
    tabItems.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            clearInterval(autoPlayInterval); // 清除当前的自动轮播
            switchTab(index);
            // 重新开始自动轮播
            autoPlayInterval = setInterval(autoPlay, 2000);
        });
    });

    // 文字动效初始化函数
    function initBreathingText() {
        const title = document.querySelector('.breathing-text');
        if (!title) return;
    
        // 获取原始文本
        const text = title.textContent;
        // 清空原内容
        title.textContent = '';
        
        // 将每个字符包装在 span 标签中
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.setProperty('--char-index', index);
            span.textContent = char;
            title.appendChild(span);
        });
    }

    // 页面加载完成后初始化动效
    document.addEventListener('DOMContentLoaded', () => {
        initBreathingText();
    });
    // 文字动效初始化
    document.addEventListener('DOMContentLoaded', () => {
        // 文字动效初始化函数（删除重复的初始化代码）
        function initBreathingText() {
            const title = document.querySelector('.hero-title');
            if (!title) return;
        
            const text = title.textContent;
            title.innerHTML = text.split('').map((char, index) => 
                `<span class="char" style="--char-index: ${index}">${char}</span>`
            ).join('');
        }
    
        // 初始化动效
        initBreathingText();
    });
    // 添加图片保护功能
    document.addEventListener('DOMContentLoaded', function() {
        const backgroundImage = document.querySelector('.background-image');
        
        // 禁用右键菜单
        backgroundImage.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 禁止拖拽
        backgroundImage.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 禁止选择
        backgroundImage.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 禁止复制
        backgroundImage.addEventListener('copy', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 禁用键盘快捷键
        document.addEventListener('keydown', function(e) {
            // 禁用Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12等快捷键
            if (
                (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
                (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                e.keyCode === 123 // F12
            ) {
                e.preventDefault();
                return false;
            }
        });
    });
});