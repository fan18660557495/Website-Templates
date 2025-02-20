// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.getElementById('templateSearch');
    const clearButton = document.getElementById('clearSearch');
    const templateCards = document.querySelectorAll('.template-card');
    const categoryItems = document.querySelectorAll('.category-item');
    const searchContainer = document.querySelector('.search-container');

    // 创建无结果提示元素
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.textContent = '暂无内容哦～';
    noResultsMessage.style.cssText = 'position: absolute; left: 50%; margin-top:200px; transform: translate(-50%, -50%); text-align: center; color: #86909C; font-size: 14px;';
    searchContainer.appendChild(noResultsMessage);

    // 显示无结果提示
    function showNoResultsMessage() {
        noResultsMessage.style.display = 'block';
    }

    // 隐藏无结果提示
    function hideNoResultsMessage() {
        noResultsMessage.style.display = 'none';
    }

    // 初始化页面
    initializeTemplates();
    hideNoResultsMessage();

    // 初始化函数
    function initializeTemplates() {
        // 默认选中"全部"分类
        document.querySelector('.category-item').classList.add('active');
        // 初始排序所有卡片
        sortTemplateCards();
    }

    // 排序模版卡片
    function sortTemplateCards() {
        const templateGrid = document.querySelector('.template-grid');
        const cardsArray = Array.from(templateCards);

        cardsArray.sort((a, b) => {
            // 首先按HOT标签排序
            const aHot = a.querySelector('.hot-tag') !== null;
            const bHot = b.querySelector('.hot-tag') !== null;
            if (aHot && !bHot) return -1;
            if (!aHot && bHot) return 1;

            // 其次按名称首字母排序
            const aTitle = a.querySelector('h3').textContent;
            const bTitle = b.querySelector('h3').textContent;
            return aTitle.localeCompare(bTitle, 'zh-CN');
        });

        // 重新插入排序后的卡片
        cardsArray.forEach(card => templateGrid.appendChild(card));
    }

    // 监听搜索输入
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase().trim();
        
        // 显示/隐藏清空按钮
        clearButton.style.display = searchText.length > 0 ? 'flex' : 'none';
        
        let hasResults = false;
        // 搜索逻辑
        templateCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.feature-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matchesSearch = title.includes(searchText) || 
                                description.includes(searchText) || 
                                tags.some(tag => tag.includes(searchText));
            
            card.style.display = matchesSearch ? '' : 'none';
            if (matchesSearch) hasResults = true;
        });

        // 显示或隐藏无结果提示
        if (!hasResults && searchText.length > 0) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    });

    // 清空按钮点击事件
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        hideNoResultsMessage();
        
        // 显示所有模版卡片
        templateCards.forEach(card => {
            card.style.display = '';
        });
    });

    // 分类标签点击事件
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他标签的active类
            categoryItems.forEach(i => i.classList.remove('active'));
            // 添加当前标签的active类
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            
            // 显示/隐藏相应分类的卡片
            templateCards.forEach(card => {
                if (category === '全部' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});