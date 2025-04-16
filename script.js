// Placeholder for JavaScript functionality
// Example: Dynamic addition of orders

document.addEventListener('DOMContentLoaded', () => {
    console.log('Order management interface loaded.');

    // Highlight overdue orders
    const orderCards = document.querySelectorAll('.order-card');
    orderCards.forEach(card => {
        const dueDateText = card.querySelector('p:nth-of-type(3)').textContent;
        if (dueDateText.includes('days ago')) {
            card.style.border = '2px solid red';
        }
    });

    // Dynamic addition of new orders
    const addOrder = (columnClass, orderDetails) => {
        const column = document.querySelector(`.${columnClass}`);
        if (!column) return;

        const newOrder = document.createElement('div');
        newOrder.classList.add('order-card');
        newOrder.innerHTML = `
            <p><strong>${orderDetails.id} - ${orderDetails.name}</strong></p>
            <p>Placed: ${orderDetails.placed}</p>
            <p>Due: ${orderDetails.due}</p>
            <p>${orderDetails.paymentMethod}: $${orderDetails.amount}</p>
        `;
        column.appendChild(newOrder);

        // Add click event to move the order to the next column
        newOrder.addEventListener('click', () => {
            moveOrder(newOrder, 'confirmed');
        });
    };

    // Function to move an order to the next column
    const moveOrder = (orderCard, targetColumnClass) => {
        const targetColumn = document.querySelector(`.${targetColumnClass}`);
        if (!targetColumn) return;

        // Remove the order card from its current column
        orderCard.parentElement.removeChild(orderCard);

        // Update the "Due" text to indicate "Due Soon"
        const dueText = orderCard.querySelector('p:nth-of-type(3)');
        if (dueText) {
            dueText.textContent = 'Due: Due Soon';
        }

        // Append the order card to the target column
        targetColumn.appendChild(orderCard);

        // Update the click event to move to the next stage (e.g., "Ready")
        orderCard.addEventListener('click', () => {
            moveOrder(orderCard, 'ready');
        });
    };

    // Example usage: Adding new orders dynamically
    addOrder('unconfirmed', {
        id: '276',
        name: 'New Customer',
        placed: 'Today',
        due: '2 hours from now',
        paymentMethod: 'Card',
        amount: '45.00'
    });

    addOrder('unconfirmed', {
        id: '277',
        name: 'John Doe',
        placed: '1 hour ago',
        due: '30 minutes from now',
        paymentMethod: 'Cash',
        amount: '20.00'
    });
});
