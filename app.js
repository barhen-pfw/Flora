let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})
// Get the submit button element
const submitButton = document.querySelector('input[type="submit"]');

let products = [
    {
        id: 1,
        name: '10” Assorted Flowering Hanging Baskets',
        image: '1.PNG',
        price: 17.99
    },
    {
        id: 2,
        name: 'Assorted Rose Globe pk 6 SALE RETAIL: $15.99 Regular Retail $17.99 Available Weekly in JUNE ',
        image: '2.PNG',
        price: 17.99
    },
    {
        id: 3,
        name: 'Garden Parade Bouquet pk 12 SALE RETAIL:$7.99 Available June 7th-20th-10th BOOK BY May 22nd ',
        image: '3.PNG',
        price: 7.99
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 17.00
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 17.00
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 17.00
    },
    {
        id: 7,
        name: 'PRODUCT NAME ',
        image: '7.PNG',
        price: 17.00
    },
    {
        id: 8,
        name: 'PRODUCT NAME 8',
        image: '8.PNG',
        price: 17.00
    },
    {
        id: 9,
        name: 'PRODUCT NAME 9',
        image: '9.PNG',
        price: 17.00
    },
    {
        id: 10,
        name: 'PRODUCT NAME 10 ',
        image: '10.PNG',
        price: 17.00
    },
    {
        id: 11,
        name: 'PRODUCT NAME 11',
        image: '11.PNG',
        price: 17.00
    },
    {
        id: 12,
        name: 'PRODUCT NAME 12',
        image: '12.PNG',
        price: 17.00
    },
    {
        id: 13,
        name: 'PRODUCT NAME 13 ',
        image: '13.PNG',
        price: 17.00
    },
    {
        id: 14,
        name: 'PRODUCT NAME 14',
        image: '14.PNG',
        price: 17.00
    },
    {
        id: 15,
        name: 'PRODUCT NAME 15',
        image: '15.PNG',
        price: 17.00
    },
    {
        id: 16,
        name: 'PRODUCT NAME 16 ',
        image: '16.PNG',
        price: 17.00
    },
    {
        id: 17,
        name: 'PRODUCT NAME 17',
        image: '17.PNG',
        price: 17.00
    },
    {
        id: 18,
        name: 'PRODUCT NAME 18',
        image: '18.PNG',
        price: 17.00
    },
    {
        id: 19,
        name: 'PRODUCT NAME 19',
        image: '19.PNG',
        price: 17.00
    },
    {
        id: 20,
        name: 'PRODUCT NAME 20',
        image: '20.PNG',
        price: 17.00
    }, 
    {
        id: 21,
        name: 'PRODUCT NAME 21',
        image: '21.PNG',
        price: 17.00
       
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <div class="col-md-4 quantity">
            <label for="quantity">Quantity:</label>
            <input id="quantity" type="number" value ="1" class="form-control quantity-input">
        </div><br>

            <button onclick="addToCard(${key}, this.parentElement.querySelector('.quantity-input').value)">Add To Card</button>`;
        list.appendChild(newDiv);
       
    })
}
initApp();
function addToCard(key,quantity){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = quantity;
    }else{
        var sum = parseInt(listCards[key].quantity, 10) + parseInt(quantity, 10);
        changeQuantity(key, sum);
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = parseInt(count) + parseInt(value.quantity);
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>$${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
function exportToExcel(filename) {
    // Create a table HTML string with the data
    let tableContent = generateReceiptTable(listCards);
  
    // Create a Blob object with the HTML content
    const blob = new Blob([tableContent], { type: 'application/vnd.ms-excel' });
  
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
  
    // Create a link element and set its attributes
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
  
    // Simulate a click on the link to start the download
    link.click();
  
    // Clean up the URL object
    URL.revokeObjectURL(url);
  }
  function generateReceiptTable(listCards) {
     // Retrieve form field values
  const accountNumber = document.getElementById('account-number').value;
  const customerName = document.getElementById('customer-name').value;
  const storeName = document.getElementById('store-name').value;
  const phoneNumber = document.getElementById('phone-num').value;
  const email = document.getElementById('email').value;
  const confirmation = document.querySelector('input[name="confirm"]:checked')?.value;
  const date = document.getElementById('date').value;
  const comment = document.getElementById('css-questions').value;

  let tableContent = `<p><strong>Name:</strong> ${customerName}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Account Number:</strong> ${accountNumber}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
  `;
    tableContent += '<table>';
    tableContent += `
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    `;
    let subtotal = 0;
    listCards.forEach(item => {
      const total = item.price * item.quantity;
      tableContent += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
          <td>$${total.toFixed(2)}</td>
        </tr>
      `;
      subtotal += total;
    });
    // Calculate discounts and total
  const discount = 0; // Example discount value
  const total = subtotal - discount;

    tableContent += `
    <tr>
      <td></td>
      <td></td>
      <td><strong>Subtotal</strong></td>
      <td>$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td><strong>Discount</strong></td>
    <td>$${discount.toFixed(2)}</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td><strong>Total</strong></td>
    <td>$${total.toFixed(2)}</td>
  </tr>
  `;
    tableContent += '</table>';
  // Notes below the table
  tableContent += `
    <p><strong>Notes:</strong>${comment}</p>
  `;
    return tableContent;
  }
  

// Function to export listCards data to Excel
function exportListCardsToExcel() {
    // Call the exportToExcel function with the listCards array and desired filename
    exportToExcel('listCards.xls');
  }
 
  
  // Add a click event listener to the export button
  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior
    exportListCardsToExcel();
  });

