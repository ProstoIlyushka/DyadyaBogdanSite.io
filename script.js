document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuToggle || !mobileMenu) {
        console.error('Меню или кнопка переключения не найдены!');
        return;
    }

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault(); // Всегда предотвращаем переход
        mobileMenu.classList.toggle('active');
        console.log('Меню переключено'); // Для отладки
    });
});

window.onload = function() {
    initializeFilters();
};

function initializeFilters() {
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) {
        console.log('Фильтры не найдены на странице');
        return;
    }

    let activeTypeFilters = ['all'];
    let activeMeatFilters = ['all'];

    const typeButtons = document.querySelectorAll('[data-filter]');
    const meatButtons = document.querySelectorAll('[data-meat]');

    // Обработчики для фильтров по типу блюда
    typeButtons.forEach(button => {
        button.onclick = function() {
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                typeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                activeTypeFilters = ['all'];
            } else {
                document.querySelector('[data-filter="all"]').classList.remove('active');
                
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    activeTypeFilters = activeTypeFilters.filter(f => f !== 'all');
                    activeTypeFilters.push(filterValue);
                } else {
                    activeTypeFilters = activeTypeFilters.filter(f => f !== filterValue);
                }
                
                if (activeTypeFilters.length === 0) {
                    document.querySelector('[data-filter="all"]').classList.add('active');
                    activeTypeFilters = ['all'];
                }
            }
            
            applyFilters(activeTypeFilters, activeMeatFilters);
            updateCategoryHeaders(activeTypeFilters);
        };
    });

    // Обработчики для фильтров по мясу
    meatButtons.forEach(button => {
        button.onclick = function() {
            const filterValue = this.getAttribute('data-meat');
            
            if (filterValue === 'all') {
                meatButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                activeMeatFilters = ['all'];
            } else {
                document.querySelector('[data-meat="all"]').classList.remove('active');
                
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    activeMeatFilters = activeMeatFilters.filter(f => f !== 'all');
                    activeMeatFilters.push(filterValue);
                } else {
                    activeMeatFilters = activeMeatFilters.filter(f => f !== filterValue);
                }
                
                if (activeMeatFilters.length === 0) {
                    document.querySelector('[data-meat="all"]').classList.add('active');
                    activeMeatFilters = ['all'];
                }
            }
            
            applyFilters(activeTypeFilters, activeMeatFilters);
            updateCategoryHeaders(activeTypeFilters);
        };
    });

    // Устанавливаем начальное состояние
    document.querySelector('[data-filter="all"]')?.classList.add('active');
    document.querySelector('[data-meat="all"]')?.classList.add('active');
}

function updateCategoryHeaders(activeFilters) {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        const category = header.getAttribute('data-category');
        if (activeFilters.includes('all') || activeFilters.includes(category)) {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
    });
}

function applyFilters(typeFilters, meatFilters) {
    console.log('Применяем фильтры:', { типы: typeFilters, мясо: meatFilters });

    const menuItems = document.querySelectorAll('.menu-item');
    let visibleItems = 0;
    
    menuItems.forEach(item => {
        const matchesType = typeFilters.includes('all') || 
            typeFilters.some(filter => item.classList.contains(filter));
            
        const matchesMeat = meatFilters.includes('all') || 
            meatFilters.some(filter => item.classList.contains(`meat-${filter}`));
        
        if (matchesType && matchesMeat) {
            item.style.display = 'block';
            visibleItems++;
        } else {
            item.style.display = 'none';
        }
    });

    // Показываем сообщение, если ничего не найдено
    const noResultsMessage = document.querySelector('.no-results');
    if (visibleItems === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.textContent = 'По вашему запросу ничего не найдено';
            document.querySelector('.menu-container').appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}
