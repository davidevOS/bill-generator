const btnAdd = document.querySelector('.add-item')
const item = document.querySelectorAll('.item')
const container = document.querySelector(".items")

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
        <select id="select-product-${count}" class="select-product">
            <option value="">Select Product</option>
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
            <option value="product3">Product 3</option>
        </select>
    </div>
    <div>
        <label for="price">Price</label>
        <input type="number" id="price-${count}" class="price" required>
    </div>
    <div>
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity-${count}" class="quantity" onblur="subTotal()" required>
    </div>
    <div>
        <label for="quantity">Subtotal</label>
        <input type="number" id="subtotal-${count}" class="subtotal" required>
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
        document.getElementById(`subtotal-${i+1}`).value = parseInt(price) * parseInt(quantity); 
        
    }

    sumTotal()
}

const sumTotal = () => {
    count
    let totalAmount = 0
    for (let i = 0; i < count; i++) {
        const quantity = document.getElementById(`subtotal-${i+1}`).value
        const subtotal = parseInt(quantity)

        totalAmount += subtotal
        
    }

    document.getElementById('total').value = totalAmount
    
}