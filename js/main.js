// Main JavaScript file for Nike Clone website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const bars = mobileMenu.querySelectorAll('.bar');
            if (bars.length > 0) {
                bars[0].classList.toggle('rotate-down');
                bars[1].classList.toggle('fade-out');
                bars[2].classList.toggle('rotate-up');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger menu animation
            const bars = mobileMenu.querySelectorAll('.bar');
            if (bars.length > 0) {
                bars[0].classList.remove('rotate-down');
                bars[1].classList.remove('fade-out');
                bars[2].classList.remove('rotate-up');
            }
        }
    });
    
    // Product Color Selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options in the same product card
            const parentCard = this.closest('.product-card');
            const siblingOptions = parentCard.querySelectorAll('.color-option');
            
            siblingOptions.forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // Add active class to selected option
            this.classList.add('active');
            
            // You could also change the product image based on color selection
            // This would require having multiple images for each product
            // const productImg = parentCard.querySelector('.product-img');
            // productImg.src = 'path/to/new/image-based-on-color.jpg';
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scrolling down & past the header height
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        
        // Add box shadow when scrolled
        if (scrollTop > 0) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Success - would normally submit to server
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                // Error
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notifications if not already in stylesheet
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification.success {
                background-color: #4caf50;
            }
            
            .notification.error {
                background-color: #f44336;
            }
            
            .notification.warning {
                background-color: #ff9800;
            }
            
            /* Mobile menu animation */
            .bar {
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .rotate-down {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .fade-out {
                opacity: 0;
            }
            
            .rotate-up {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            
            /* Header animations */
            .header-hidden {
                transform: translateY(-100%);
            }
            
            .header-scrolled {
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            header {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Product Quick View functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product data from parent card
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-img').src;
            
            // Create modal HTML
            const modalHTML = `
                <div class="quick-view-modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-product">
                            <div class="modal-product-image">
                                <img src="${productImage}" alt="${productName}">
                            </div>
                            <div class="modal-product-info">
                                <h2>${productName}</h2>
                                <p class="modal-category">${productCategory}</p>
                                <p class="modal-price">${productPrice}</p>
                                <div class="modal-colors">
                                    <h3>Select Color:</h3>
                                    <div class="color-options">
                                        ${Array.from(productCard.querySelectorAll('.color-option')).map(color => 
                                            `<span class="color-option" style="${color.getAttribute('style')}"></span>`
                                        ).join('')}
                                    </div>
                                </div>
                                <div class="modal-sizes">
                                    <h3>Select Size:</h3>
                                    <div class="size-options">
                                        <span class="size-option">7</span>
                                        <span class="size-option">7.5</span>
                                        <span class="size-option">8</span>
                                        <span class="size-option">8.5</span>
                                        <span class="size-option">9</span>
                                        <span class="size-option">9.5</span>
                                        <span class="size-option">10</span>
                                        <span class="size-option">10.5</span>
                                        <span class="size-option">11</span>
                                    </div>
                                </div>
                                <div class="modal-quantity">
                                    <h3>Quantity:</h3>
                                    <div class="quantity-selector">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="number" value="1" min="1" max="10">
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                </div>
                                <div class="modal-actions">
                                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                                    <button class="btn btn-secondary add-to-wishlist">
                                        <i class="fas fa-heart"></i> Add to Wishlist
                                    </button>
                                </div>
                                <div class="modal-details">
                                    <h3>Product Details:</h3>
                                    <p>Experience ultimate comfort and style with these premium Nike shoes. Featuring innovative cushioning technology and breathable materials for all-day wear.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to DOM
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer.firstChild);
            
            // Add modal styles if not already in stylesheet
            if (!document.querySelector('#modal-styles')) {
                const style = document.createElement('style');
                style.id = 'modal-styles';
                style.textContent = `
                    .quick-view-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1001;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .quick-view-modal.show {
                        opacity: 1;
                    }
                    
                    .modal-content {
                        background-color: white;
                        border-radius: 8px;
                        max-width: 900px;
                        width: 90%;
                        max-height: 90vh;
                        overflow-y: auto;
                        position: relative;
                        transform: translateY(-50px);
                        transition: transform 0.3s ease;
                    }
                    
                    .quick-view-modal.show .modal-content {
                        transform: translateY(0);
                    }
                    
                    .close-modal {
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 28px;
                        cursor: pointer;
                        z-index: 1;
                    }
                    
                    .modal-product {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    
                    .modal-product-image {
                        flex: 1;
                        min-width: 300px;
                    }
                    
                    .modal-product-image img {
                        width: 100%;
                        height: auto;
                        border-radius: 8px 0 0 8px;
                    }
                    
                    .modal-product-info {
                        flex: 1;
                        padding: 30px;
                        min-width: 300px;
                    }
                    
                    .modal-product-info h2 {
                        font-size: 24px;
                        margin-bottom: 5px;
                    }
                    
                    .modal-category {
                        color: #757575;
                        margin-bottom: 10px;
                    }
                    
                    .modal-price {
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 20px;
                    }
                    
                    .modal-colors, .modal-sizes, .modal-quantity, .modal-details {
                        margin-bottom: 20px;
                    }
                    
                    .modal-colors h3, .modal-sizes h3, .modal-quantity h3, .modal-details h3 {
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    
                    .size-options {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    
                    .size-option {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        border: 1px solid #e5e5e5;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .size-option:hover, .size-option.active {
                        background-color: #111;
                        color: white;
                        border-color: #111;
                    }
                    
                    .quantity-selector {
                        display: flex;
                        align-items: center;
                        max-width: 120px;
                    }
                    
                    .quantity-btn {
                        width: 30px;
                        height: 30px;
                        background-color: #f5f5f5;
                        border: none;
                        cursor: pointer;
                    }
                    
                    .quantity-selector input {
                        width: 60px;
                        height: 30px;
                        text-align: center;
                        border: 1px solid #e5e5e5;
                        border-left: none;
                        border-right: none;
                    }
                    
                    .modal-actions {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 20px;
                    }
                    
                    .add-to-cart {
                        flex: 2;
                    }
                    
                    .add-to-wishlist {
                        flex: 1;
                    }
                    
                    .modal-details p {
                        color: #757575;
                        line-height: 1.6;
                    }
                    
                    @media (max-width: 768px) {
                        .modal-product {
                            flex-direction: column;
                        }
                        
                        .modal-product-image img {
                            border-radius: 8px 8px 0 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Show modal with animation
            const modal = document.querySelector('.quick-view-modal');
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', closeModal);
            
            // Close when clicking outside modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Size selection functionality
            const sizeOptions = modal.querySelectorAll('.size-option');
            sizeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    sizeOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Color selection functionality
            const modalColorOptions = modal.querySelectorAll('.color-option');
            modalColorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    modalColorOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Quantity selector functionality
            const minusBtn = modal.querySelector('.minus');
            const plusBtn = modal.querySelector('.plus');
            const quantityInput = modal.querySelector('.quantity-selector input');
            
            minusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value < 10) {
                    quantityInput.value = value + 1;
                }
            });
            
            // Add to cart functionality
            const addToCartBtn = modal.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', function() {
                const selectedSize = modal.querySelector('.size-option.active');
                const selectedColor = modal.querySelector('.color-option.active');
                
                if (!selectedSize) {
                    showNotification('Please select a size', 'warning');
                    return;
                }
                
                if (!selectedColor) {
                    showNotification('Please select a color', 'warning');
                    return;
                }
                
                // Add to cart logic would go here
                showNotification(`${productName} added to cart!`, 'success');
                closeModal();
            });
            
            // Add to wishlist functionality
            const wishlistBtn = modal.querySelector('.add-to-wishlist');
            wishlistBtn.addEventListener('click', function() {
                showNotification(`${productName} added to wishlist!`, 'success');
            });
            
            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    });
    
    // Initialize first color option as active for each product
    document.querySelectorAll('.product-card').forEach(card => {
        const firstColor = card.querySelector('.color-option');
        if (firstColor) {
            firstColor.classList.add('active');
        }
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
});