  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBkAg0SPfFF-bcqYW8G6MmvOIleaEDXFKU",
    authDomain: "bills-generator.firebaseapp.com",
    projectId: "bills-generator",
    storageBucket: "bills-generator.appspot.com",
    messagingSenderId: "611722669999",
    appId: "1:611722669999:web:68e9e6fc40fa7601f8895a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   Firestore DB Connection
const db = firebase.firestore()

const billForm = document.querySelector("#bill-form")
const billsTable = document.querySelector(".section-table table tbody");

// Save Bill
const saveBill = (name, email, phone, address, product, price, quantity, subtotal, total, date) => {
    db.collection('bills').doc().set({
        name, email, phone, address, product, price, quantity,
        subtotal, total, date
    })
}

// Get all Bills
const getBills = () => db.collection('bills').get();

// Render Bills
window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getBills()
    querySnapshot.forEach(doc => {
        // console.log(doc.data())

        const date = doc.data().date
        const formatted_date = date.toDate().toLocaleString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
        const name = doc.data().name
        const total = doc.data().total
        const id = doc.id
        
        billsTable.innerHTML += `
         <tr>
            <td>${formatted_date}</td>
            <td>${name}</td>
            <td>$.${total}</td>
            <td>${id}</td>
         </tr>
        `
    })
})


billForm.addEventListener("submit", async (event) =>  {
    event.preventDefault();

    const name = billForm['name']
    const email = billForm['email']
    const phone = billForm['phone']
    const address = billForm['address']
    const product = billForm['select-product-1']
    const price = billForm['price-1']
    const quantity = billForm['quantity-1']
    const subtotal = billForm['subtotal-1']
    const total = billForm['total']

    let date = firebase.firestore.FieldValue.serverTimestamp()
    
    await saveBill(name.value, email.value, phone.value, address.value, product.value, price.value, quantity.value, subtotal.value, total.value, date)

    billForm.reset()
    name.focus()
    alert('Bill was generated')
})

