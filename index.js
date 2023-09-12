class Medicine {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Hardcoded admin password (replace this with a secure authentication system)
const adminPassword = "admin123";

// Initialize medicine inventory
let medicines = [
    new Medicine("Painkiller X", 10.0, 100),
    new Medicine("Cough Syrup Y", 15.0, 50),
    new Medicine("Antibiotic Z", 20.0, 75)
];

// Populate the select boxes
const buyMedicineSelect = document.getElementById("buy-medicine");
const removeMedicineSelect = document.getElementById("remove-medicine");

medicines.forEach((medicine, index) => {
    buyMedicineSelect.innerHTML += `<option value="${index}">${medicine.name}</option>`;
    removeMedicineSelect.innerHTML += `<option value="${index}">${medicine.name}</option>`;
});

// Function to check if the entered password is correct
function checkAdminPassword() {
    try {
        const password = prompt("Enter admin password:");
        if (!password) {
            throw new Error("Password is required.");
        }
        if (password !== adminPassword) {
            throw new Error("Incorrect password. Access denied.");
        }
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

// Function to update the total amount
function updateTotalAmount(amount) {
    const totalAmountElement = document.getElementById("total-amount");
    const currentAmount = parseFloat(totalAmountElement.innerText);
    totalAmountElement.innerText = (currentAmount + amount).toFixed(2);
}

// Function to display medicine quantities in the select box
function displayMedicineQuantities() {
    buyMedicineSelect.innerHTML = '';
    removeMedicineSelect.innerHTML = '';
    medicines.forEach((medicine, index) => {
        buyMedicineSelect.innerHTML += `<option value="${index}">${medicine.name} (Quantity: ${medicine.quantity})</option>`;
        removeMedicineSelect.innerHTML += `<option value="${index}">${medicine.name}</option>`;
    });
}
function populateUpdateMedicineSelect() {
    const updateMedicineSelect = document.getElementById("update-medicine-select");
    updateMedicineSelect.innerHTML = ''; // Clear the select box
    medicines.forEach((medicine, index) => {
        updateMedicineSelect.innerHTML += `<option value="${index}">${medicine.name}</option>`;
    });
}

// Call the function to populate the "Update Medicine" select box initially
populateUpdateMedicineSelect();

// Update the select box initially
displayMedicineQuantities();

function button(action) {
    switch (action) {
        case 'addMedicine':
            // Call the addMedicine function here
            addMedicine();
            break;
        case 'removeMedicine':
            // Call the removeMedicine function here
            removeMedicine();
            break;
        case 'updateMedicine':
            // Call the updateMedicine function here
            updateMedicine();
            break;
        case 'buyMedicine':
            // Call the buyMedicine function here
            buyMedicine();
            break;
        case 'checkout':
            // Call the checkout function here
            checkout();
            break;
        default:
            alert('Invalid action.');
            break;
    }
}

// Functions
function addMedicine() {
    try {
        if (checkAdminPassword()) {
            const medicineName = document.getElementById("medicine-name").value;
            const medicinePrice = parseFloat(document.getElementById("medicine-price").value);
            const medicineQuantity = parseInt(document.getElementById("medicine-quantity").value);

            if (!medicineName || isNaN(medicinePrice) || isNaN(medicineQuantity) || medicinePrice <= 0 || medicineQuantity <= 0) {
                throw new Error("Invalid input. Please enter valid name, price, and quantity.");
            }

            const newMedicine = new Medicine(medicineName, medicinePrice, medicineQuantity);
            medicines.push(newMedicine);
            buyMedicineSelect.innerHTML += `<option value="${medicines.length - 1}">${newMedicine.name} (Quantity: ${newMedicine.quantity})</option>`;
            removeMedicineSelect.innerHTML += `<option value="${medicines.length - 1}">${newMedicine.name}</option>`;
            document.getElementById("medicine-name").value = "";
            document.getElementById("medicine-price").value = "";
            document.getElementById("medicine-quantity").value = "";
        }
    } catch (error) {
        alert(error.message);
    }
}
function updateMedicine() {
    try {
        if (checkAdminPassword()) {
            const updateMedicineSelect = document.getElementById("update-medicine-select");
            const selectedIndex = updateMedicineSelect.value;
            
            if (selectedIndex >= 0 && selectedIndex < medicines.length) {
                const newMedicineName = document.getElementById("update-medicine-name").value;
                const newMedicinePrice = parseFloat(document.getElementById("update-medicine-price").value);
                const newMedicineQuantity = parseInt(document.getElementById("update-medicine-quantity").value);

                if (!newMedicineName || isNaN(newMedicinePrice) || isNaN(newMedicineQuantity) || newMedicinePrice <= 0 || newMedicineQuantity <= 0) {
                    throw new Error("Invalid input. Please enter a valid name, price, and quantity.");
                }

                medicines[selectedIndex].name = newMedicineName;
                medicines[selectedIndex].price = newMedicinePrice;
                medicines[selectedIndex].quantity = newMedicineQuantity;
                displayMedicineQuantities();
                populateUpdateMedicineSelect()
                alert(`Medicine '${newMedicineName}' has been updated.`);
            } else {
                throw new Error("Invalid selection.");
            }
        }
    } catch (error) {
        alert(error.message);
    }
}

function removeMedicine() {
    try {
        if (checkAdminPassword()) {
            const index = removeMedicineSelect.value;
            const quantityToRemove = parseInt(prompt(`Enter quantity to remove for ${medicines[index].name}:`));

            if (index >= 0 && index < medicines.length && !isNaN(quantityToRemove) && quantityToRemove > 0) {
                if (quantityToRemove >= medicines[index].quantity) {
                    medicines.splice(index, 1);
                    buyMedicineSelect.remove(index);
                    removeMedicineSelect.remove(index);
                    populateUpdateMedicineSelect();
                } else {
                    medicines[index].quantity -= quantityToRemove;
                }
            } else {
                throw new Error("Invalid selection or quantity to remove.");
            }
        }
    } catch (error) {
        alert(error.message);
    }
}

let cart = [];

function buyMedicine() {
    try {
        const index = buyMedicineSelect.value;
        const quantity = parseInt(document.getElementById("buy-quantity").value);

        if (index >= 0 && index < medicines.length && quantity > 0 && medicines[index].quantity >= quantity) {
            const selectedMedicine = medicines[index];
            selectedMedicine.quantity -= quantity;
            const totalPrice = selectedMedicine.price * quantity;
            updateTotalAmount(totalPrice);
            displayMedicineQuantities();
            document.getElementById("output-text").innerText = `${quantity} ${selectedMedicine.name} added to cart.`;
        } else {
            throw new Error("Invalid selection or quantity exceeds stock.");
        }
    } catch (error) {
        alert(error.message);
    }
}

function checkout() {
    let totalAmount = 0;
    cart.forEach((medicine) => {
        totalAmount += medicine.price;
    });
    document.getElementById("total-amount").innerText = totalAmount.toFixed(2);
    cart = [];
    document.getElementById("output-text").innerText = "Checkout complete.";
}