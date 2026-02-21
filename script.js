$(document).ready(function() {
    
    let customer = {
        name: "",
        email: "",
        tier: "Standard",
        cart: []
    };

    
    function loadProfile() {
        let savedData = localStorage.getItem('customerData');

        if (savedData) {
            customer = JSON.parse(savedData);
        }
        
        updateUI();
    }


    function updateUI() {
        
        $('#nameInput').val(customer.name);
        $('#emailInput').val(customer.email);
        $('#tierInput').val(customer.tier);
        
        let $display = $('#displayArea');
        
        if (customer.name) {
            let cartItems = customer.cart.length > 0 ? customer.cart.join(', ') : "Cart is empty";
            
            
            $display.html(`
                <h3 class="h5">Welcome back, ${customer.name}!</h3>
                <p class="mb-1"><strong>Email:</strong> ${customer.email}</p>
                <p class="mb-1"><strong>Membership:</strong> ${customer.tier}</p>
                <p class="mb-0"><strong>Your Cart:</strong> ${cartItems}</p>
            `);
        } else {
            $display.html(`<p class="mb-0 text-muted">No profile data found. Please enter your details above and save.</p>`);
        }
    }

    
    $('#saveBtn').click(function() {
        customer.name = $('#nameInput').val();
        customer.email = $('#emailInput').val();
        customer.tier = $('#tierInput').val();
        
        let jsonString = JSON.stringify(customer);
        localStorage.setItem('customerData', jsonString);
        
        updateUI();
        alert("Profile successfully saved as JSON!");
    });


    $('.add-item-btn').click(function() {

        let item = $(this).data('item'); 
        
        customer.cart.push(item);
        localStorage.setItem('customerData', JSON.stringify(customer));
        
        updateUI();
    });

    
    $('#clearBtn').click(function() {
        localStorage.removeItem('customerData');
        customer = { name: "", email: "", tier: "Standard", cart: [] }; 
        updateUI();
    });

    // Initialize the app when the DOM is ready
    loadProfile();
});