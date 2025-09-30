document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const allProducts = document.querySelectorAll('.product-card[data-brand]');

    function showProductsInTab(brand) {
        const targetPane = document.getElementById(brand);
        const productGrid = targetPane.querySelector('.product-grid');
        
        productGrid.innerHTML = '';
        
        if (brand === 'all') {
            allProducts.forEach(product => {
                productGrid.appendChild(product.cloneNode(true));
            });
        } else {
            allProducts.forEach(product => {
                if (product.dataset.brand === brand) {
                    productGrid.appendChild(product.cloneNode(true));
                }
            });
        }
    }

    function switchTab(targetTab) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetPane = document.getElementById(targetTab);
        
        targetButton.classList.add('active');
        targetPane.classList.add('active');
        
        showProductsInTab(targetTab);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
        });
    });

    // Initialize with all products shown
    showProductsInTab('all');
});