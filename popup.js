//---================ "ODRER PLACED"==============---------
// Get elements
const placeOrderButton = document.querySelector('.checks');
const popups = document.getElementById('order-success-popup');
const okButton = document.getElementById('popup-ok-button');

// Show popup when Place Order button is clicked
placeOrderButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    popups.classList.remove('hidden');
    popups.classList.add('visible');
});

// Close popup when OK button is clicked
okButton.addEventListener('click', () => {
    popups.classList.remove('visible');
    popups.classList.add('hidden');
});
