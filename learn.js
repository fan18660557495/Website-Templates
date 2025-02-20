document.addEventListener('DOMContentLoaded', function() {
    // 获取导航菜单相关元素
    const docsNav = document.querySelector('.docs-nav');
    const toggleNavBtn = document.querySelector('.toggle-nav');
    const docsContent = document.querySelector('.docs-content');
    const searchInput = document.getElementById('docsSearch');
    const clearButton = document.getElementById('clearSearch');
    const contentSections = document.querySelectorAll('.content-section');
    const searchContainer = document.querySelector('.search-container');
    let searchTimeout;

    // 初始化导航菜单状态
    let isNavCollapsed = false;

    // 为折叠按钮添加点击事件监听
    toggleNavBtn.addEventListener('click', function() {
        // 切换导航菜单状态
        isNavCollapsed = !isNavCollapsed;

        // 更新导航菜单样式
        if (isNavCollapsed) {
            docsNav.style.width = '60px';
            docsNav.style.minWidth = '60px';
            docsNav.classList.add('collapsed');
            docsContent.style.marginLeft = '12px';
        } else {
            docsNav.style.width = '250px';
            docsNav.style.minWidth = '250px';
            docsNav.classList.remove('collapsed');
            docsContent.style.marginLeft = '12px';
        }

        // 更新按钮图标方向
        toggleNavBtn.style.transform = isNavCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    // 初始化时隐藏清除按钮
    clearButton.style.display = 'none';

    // 搜索功能实现
    function performSearch(searchText) {
        const searchTerms = searchText.toLowerCase().split(' ').filter(term => term.length > 0);
        let hasResults = false;
        
        if (searchTerms.length === 0) {
            // 如果搜索框为空，显示默认内容
            contentSections.forEach(section => {
                section.style.display = section.id === 'quick-start' ? 'block' : 'none';
                removeHighlights(section);
            });
            hideNoResultsMessage();
            return;
        }

        contentSections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const match = searchTerms.some(term => content.includes(term));
            
            if (match) {
                section.style.display = 'block';
                highlightText(section, searchTerms);
                hasResults = true;
            } else {
                section.style.display = 'none';
                removeHighlights(section);
            }
        });

        // 显示或隐藏无结果提示
        if (!hasResults) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }

    // 高亮显示匹配文本
    function highlightText(element, searchTerms) {
        removeHighlights(element);
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodes = [];
        let node;
        while (node = walker.nextNode()) {
            nodes.push(node);
        }

        nodes.forEach(node => {
            const parent = node.parentNode;
            if (parent.nodeName !== 'SCRIPT') {
                let content = node.textContent;
                searchTerms.forEach(term => {
                    const regex = new RegExp(term, 'gi');
                    content = content.replace(regex, match => 
                        `<span class=\"highlight-text\">${match}</span>`
                    );
                });
                
                if (content !== node.textContent) {
                    const span = document.createElement('span');
                    span.innerHTML = content;
                    parent.replaceChild(span, node);
                }
            }
        });
    }

    // 移除高亮
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('.highlight-text');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(
                document.createTextNode(highlight.textContent),
                highlight
            );
        });
    }

    // 添加搜索输入事件监听
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const searchText = e.target.value.trim();
        
        // 显示/隐藏清除按钮
        clearButton.style.display = searchText ? 'flex' : 'none';
        
        // 延迟执行搜索，提升性能
        searchTimeout = setTimeout(() => {
            performSearch(searchText);
        }, 300);
    });

    // 清除搜索
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        performSearch('');
    });

    // 初始化清除按钮状态
    clearButton.style.display = 'none';

    // 创建无结果提示元素
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.textContent = '暂无内容哦～';
    searchContainer.appendChild(noResultsMessage);

    // 显示无结果提示
    function showNoResultsMessage() {
        noResultsMessage.style.display = 'block';
    }

    // 隐藏无结果提示
    function hideNoResultsMessage() {
        noResultsMessage.style.display = 'none';
    }

    // 添加搜索结果样式
    const style = document.createElement('style');
    style.textContent = `
        .highlight-text {
            background-color:rgb(179, 216, 255);
            padding: 0 2px;
            border-radius: 2px;
        }
        .search-container {
            position: relative;
            display: flex;
            align-items: center;
        }
        .search-input {
            padding-right: 40px;
        }
        .clear-button {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 5px;
            color: #4E5969;
            z-index: 1;
        }
        .clear-button:hover {
            color: #1D2129;
        }
        .clear-button svg {
            width: 16px;
            height: 16px;
            display: block;
        }
        .no-results-message {
            display: none;
            text-align: center;
            padding: 20px;
            color: #86909C;
            font-size: 14px;
            margin-top: 200px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);

    // 初始化时隐藏无结果提示
    hideNoResultsMessage();
    document.head.appendChild(style);
});