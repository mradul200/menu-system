const cartItems = document.querySelectorAll('.cart-item');
const itemCountElement = document.getElementById('item-count');
const totalPriceElement = document.getElementById('total-price');
const placeOrderButton = document.querySelector('footer button');
const tableBookingCard = document.getElementById('table-booking-card');
const tableButtons = document.querySelectorAll('.table-button');
const payButton = document.getElementById('pay-button');
const cartButton = document.querySelector('header span button'); // Cart button
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const closeCartButton = document.getElementById('close-cart-button');

let totalItems = 0;
let totalPrice = 0;
let selectedTable = null;

// Update total display
function updateTotal() {
    itemCountElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Handle selection and quantity updates for cart items
cartItems.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantitySpan = item.querySelector('.quantity');
    const decreaseButton = item.querySelector('.quantity-decrease');
    const increaseButton = item.querySelector('.quantity-increase');
    const deleteBtn = item.querySelector('.delete-btn');
    let quantity = parseInt(quantitySpan.textContent);
    let isSelected = false;

    // Handle item selection
    item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('quantity-decrease') &&
            !e.target.classList.contains('quantity-increase') &&
            !e.target.classList.contains('delete-btn')) {
            isSelected = !isSelected;
            if (isSelected) {
                item.style.backgroundColor = '#e6ffe6';
                totalItems += quantity;
                totalPrice += price * quantity;
            } else {
                item.style.backgroundColor = '#f9f9f9';
                totalItems -= quantity;
                totalPrice -= price * quantity;
            }
            updateTotal();
        }
    });

    // Handle quantity decrease
    decreaseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            if (isSelected) {
                totalItems--;
                totalPrice -= price;
                updateTotal();
            }
        }
    });

    // Handle quantity increase
    increaseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        quantity++;
        quantitySpan.textContent = quantity;
        if (isSelected) {
            totalItems++;
            totalPrice += price;
            updateTotal();
        }
    });

    // Handle delete button
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isSelected) {
            totalItems -= quantity; // Subtract the item's quantity from the total items
            totalPrice -= price * quantity; // Subtract the item's total price from the total price
            quantity = 1; // Reset the item's quantity to 0
            quantitySpan.textContent = quantity; // Update the quantity display
            isSelected = false; // Deselect the item
            item.style.backgroundColor = '#f9f9f9'; // Reset the item's background color
            updateTotal(); // Update the total display
        } else {
            alert('This item is not selected.');
        }
    });
});

// Show the table booking card when "Place Order" is clicked
placeOrderButton.addEventListener('click', () => {
    tableBookingCard.style.display = 'block'; // Show the modal
});

// Handle table button selection
tableButtons.forEach(button => {
    button.addEventListener('click', () => {
        tableButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedTable = button.getAttribute('data-table');
    });
});

// Handle "Pay" button click
payButton.addEventListener('click', () => {
    if (selectedTable) {
        // alert(`Table ${selectedTable} booked successfully! Proceeding to payment.`);
        const totalAmount = totalPrice.toFixed(2); // Get the total price
        window.location.href = `qr.html?total=${totalAmount}`; // Redirect to payment.html with the total amount
    } else {
        alert('Please select a table before proceeding to payment.');
    }
});

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.toLowerCase().trim();

    cartItems.forEach(item => {
        const dishNameElement = item.querySelector('.details h3');
        const dishName = dishNameElement ? dishNameElement.textContent.toLowerCase() : '';

        if (dishName.includes(searchTerm)) {
            item.style.display = 'flex'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

// Optional: Add real-time search functi5onality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase().trim();

    cartItems.forEach(item => {
        const dishNameElement = item.querySelector('.details h3');
        const dishName = dishNameElement ? dishNameElement.textContent.toLowerCase() : '';

        if (dishName.includes(searchTerm)) {
            item.style.display = 'flex'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

// Open the cart modal
cartButton.addEventListener('click', () => {
    cartItemsList.innerHTML = ''; // Clear the list before populating

    cartItems.forEach(item => {
        const quantitySpan = item.querySelector('.quantity');
        const dishNameElement = item.querySelector('.details h3');
        const quantity = parseInt(quantitySpan.textContent);
        const dishName = dishNameElement ? dishNameElement.textContent : '';

        // Check if the item is selected
        if (item.style.backgroundColor === 'rgb(230, 255, 230)') { // Matches the selected background color
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${dishName}</span>
                <span>Qty: ${quantity}</span>
            `;
            cartItemsList.appendChild(listItem);
        }
    });

    if (cartItemsList.innerHTML === '') {
        cartItemsList.innerHTML = '<li>No items selected.</li>'; // Show a message if no items are selected
    }

    cartModal.style.display = 'flex'; // Show the modal
});

// Close the cart modal
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none'; // Hide the modal
});