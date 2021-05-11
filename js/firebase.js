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

let options = { style: 'currency', currency: 'USD' };


// Save Bill

// Get Data from Firebasde
const getBills = () => db.collection('bills').get()
const getProducts = () =>  db.collection('products').get()


const onGetProducts = (callback) => db.collection('products').onSnapshot(callback)

// Render Bills
window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getBills()
    querySnapshot.forEach(doc => {
        // console.log(doc.data())

        const date = doc.data().date
        const formatted_date = date.toDate().toLocaleString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
        const name = doc.data().name
        const total = doc.data().total
        const totalFormatted = new Intl.NumberFormat('en-US', options).format(total);
        const id = doc.id
        
        billsTable.innerHTML += `
         <tr>
            <td>${formatted_date}</td>
            <td>${name}</td>
            <td>${totalFormatted}</td>
            <td><a href="bill-details.html">${id}</a></td>
         </tr>
        `
    })
})

// Render Products
window.addEventListener('DOMContentLoaded', async (e) => {
    
    onGetProducts((querySnapshot) => {
        querySnapshot.forEach(doc => {
    
            const product = doc.data().product
            const price = doc.data().price
            
            productOption.innerHTML += `
            <option value="${product}" data-price="${price}">${product}</option>
            `

        })
    })
})


billForm.addEventListener("submit", async (event) =>  {
    event.preventDefault();

    let docData = {
        name: billForm['name'].value,
        email: billForm['email'].value,
        phone: billForm['phone'].value,
        address: billForm['address'].value,
        total: billForm['total'].value,
        date: firebase.firestore.FieldValue.serverTimestamp()
    }
     
    for (let i = 0; i < count; i++) {
        docData[`price-${i+1}`] = billForm[`quantity-${i+1}`].value
        docData[`quantity-${i+1}`] = billForm[`price-${i+1}`].value
        docData[`subtotal-${i+1}`] = billForm[`subtotal-${i+1}`].value
        
    }

    console.log(docData)

    // debugger

    await db.collection("bills").doc().set(docData).then(() => {
        console.log("Document successfully written!");
    });

    billForm.reset()
    alert('The Bill was generated!')
})

