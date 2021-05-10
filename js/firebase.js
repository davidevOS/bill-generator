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

// Save Bill
const saveBill = (name, email, phone, address, product, price, quantity, subtotal, total, date) => {
    db.collection('bills').doc().set({
        name, email, phone, address, product, price, quantity,
        subtotal, total, date        
    })
}

billForm.addEventListener("submit", async (event) =>  {
    event.preventDefault();

    const name = billForm['name'].value
    const email = billForm['email'].value
    const phone = billForm['phone'].value
    const address = billForm['address'].value
    const product = billForm['select-product-1'].value
    const price = billForm['price-1'].value
    const quantity = billForm['quantity-1'].value
    const subtotal = billForm['subtotal-1'].value
    const total = billForm['total'].value

    let date = firebase.firestore.FieldValue.serverTimestamp()
    
    await saveBill(name, email, phone, address, product, price, quantity, subtotal, total, date)
})

