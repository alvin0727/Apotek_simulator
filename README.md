# Apotek (Pharmacy) Simulator

Welcome to the Apotek Simulator website! This simulator helps manage the inventory of medicines in a pharmacy. Below are instructions on how to use this website and detailed information about its key features, code logic, class implementation, and user interface.

## How to Use

1. **Access Control**: To access administrative features, you must provide the admin password when prompted. The default admin password is "admin123" (in a real-world application, use a secure authentication system).

2. **Add Medicine**: Click the "Add Medicine" button and provide the medicine's name, price, and quantity. Once added, the medicine will appear in the inventory list.

3. **Remove Medicine**: Select a medicine from the "Remove Medicine" dropdown, enter the quantity to remove, and click "Remove Medicine." If the quantity exceeds stock, the medicine will be removed entirely.

4. **Update Medicine**: Choose a medicine from the "Update Medicine" dropdown, provide a new name, price, and quantity, and click "Update Medicine" to modify the selected medicine's details.

5. **Buy Medicine**: From the "Buy Medicine" dropdown, choose a medicine, specify the quantity to purchase, and click "Buy Medicine." The selected medicine's quantity will decrease, and the total amount spent will update.

6. **Checkout**: Click the "Checkout" button to complete a purchase session. The total amount spent on all purchases during the session will be displayed.

## Code Logic and Class Implementation

### Class: `Medicine`

```javascript
class Medicine {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
// Example function: Add Medicine
function addMedicine() {
    try {
        if (checkAdminPassword()) {
            const medicineName = document.getElementById("medicine-name").value;
            const medicinePrice = parseFloat(document.getElementById("medicine-price").value);
            const medicineQuantity = parseInt(document.getElementById("medicine-quantity").value);

            // Input validation and logic for adding medicine
            // ...

        }
    } catch (error) {
        alert(error.message);
    }
}
```
Try-catch-finally statements are used to manage errors and ensure robust error reporting. For instance, when the admin password is required, a try-catch block verifies if the password is correct and provides appropriate error messages. Try-catch blocks are also employed in other functions to handle invalid input and errors during medicine operations, offering user-friendly feedback.

# User Interface and Responsive Design

The Apotek Simulator website offers an intuitive and user-friendly user interface to manage your pharmacy's medicine inventory. The design incorporates responsive principles to ensure accessibility and usability across various devices, including desktops, tablets, and smartphones.

## Key User Interface Elements

### Add Medicine Button

```html
<button onclick="addMedicine()">Add Medicine</button>
<label for="medicine-name">Medicine Name:</label>
<input type="text" id="medicine-name"><br>
<label for="medicine-price">Price:</label>
<input type="number" id="medicine-price" step="0.01"><br>
<label for="medicine-quantity">Quantity:</label>
<input type="number" id="medicine-quantity"><br>
```
Input fields for medicine name, price, and quantity are provided with clear labels, enhancing user understanding. The use of HTML input types and attributes ensures proper data entry and validation.

## Responsive Design

The website layout is designed to adapt seamlessly to different screen sizes, offering an optimal user experience.

### CSS Media Queries

Media queries in the CSS code enable the adjustment of styling and layout based on the device's screen size. This ensures that content remains readable and accessible across various devices.

### Flexible Layouts

Flexible layouts are implemented to accommodate varying screen dimensions. Elements are arranged in a fluid grid, allowing for easy navigation and interaction regardless of the device used.

## Conclusion

The Apotek Simulator's user interface and responsive design prioritize user-friendliness and accessibility. Whether you're managing your pharmacy's medicine inventory on a desktop computer or a mobile device, you can expect a consistent and user-centric experience.

**Note**: This simulator is designed for educational purposes and should be further enhanced with additional security measures for real-world use.

