const btnAdd = document.querySelector('.add-item')
const item = document.querySelectorAll('.item')
const container = document.querySelector(".items")
// const priceInput = document.getElementsByClassName(".price");
const productOption = document.querySelector(".select-product");


let count = item.length

btnAdd.addEventListener('click', (e) => {
    e.preventDefault()
    count++
    
    const div = document.createElement('div')
    div.className = 'item'
    div.setAttribute('id', `item-${count}`)
    div.innerHTML = `
    <div>
        <span id="delete-item-1" class="delete-item">
            <img src="/assets/clear-icon.svg" alt="clear-icon" onclick="removeItem('delete-item-${count}')">
        </span>
        <label for="select-product">Product</label>
        <select id="select-product-${count}" class="select-product" onchange="getOption(this)" required>
            <option value="">Select Option</option>                        
            <option value="Fruit Snacks" data-price="3.2">Fruit Snacks</option>            
            <option value="Cereal" data-price="2.3">Cereal</option>            
            <option value="Eggs" data-price="3.3">Eggs</option>            
            <option value="Coffee" data-price="5">Coffee</option>            
            <option value="Laundry Detergen" data-price="7">Laundry Detergen</option>            
            <option value="Milk" data-price="2.5">Milk</option>            
            <option value="Ketchup" data-price="2">Ketchup</option>            
            <option value="Chips" data-price="2.5">Chips</option>            
            <option value="Butter (Stick)" data-price="2">Butter (Stick)</option>            
            <option value="Oil (vegetable)" data-price="4.5">Oil (vegetable)</option>
        </select>
    </div>
    <div>
        <label for="price">Price</label>
        <input type="number" id="price-${count}" class="price" step=".01" disabled>
    </div>
    <div>
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity-${count}" class="quantity" onblur="subTotal()" required>
    </div>
    <div>
        <label for="subtotal">Subtotal</label>
        <input type="number" id="subtotal-${count}" class="subtotal" disabled>
    </div>
    <div id="delete-item-${count}" class="delete-order"></div>
    `
    container.append(div)


})

const removeItem = (item) => {
    const deleteSpan = document.getElementById(item)
    const child = deleteSpan.parentNode
    child.parentNode.removeChild(child)
    count--

    sumTotal()
}

const subTotal = () => {
    
    for (let i = 0; i < count; i++) {
        const price = document.getElementById(`price-${i+1}`).value
        const quantity = document.getElementById(`quantity-${i+1}`).value
        document.getElementById(`subtotal-${i+1}`).value = price * quantity
        
    }

    sumTotal()
}

const sumTotal = () => {
    count
    let totalAmount = 0
    for (let i = 0; i < count; i++) {
        const quantity = document.getElementById(`subtotal-${i+1}`).value
        const subtotal = parseFloat(quantity)

        totalAmount += subtotal
        
    }

    document.getElementById('total').value = totalAmount
    
}

const getOption = (obj) => { 
    count
    const productPrice = obj.options[obj.selectedIndex].getAttribute('data-price');
    let priceInput = ""
    for (let i = 0; i < count; i++) {
        priceInput = document.querySelector("#price-"+(i+1))
    }
    priceInput.value = productPrice
} 
