const btnAdd = document.querySelector('.add-item')
const item = document.querySelectorAll('.item')
const container = document.querySelector(".items")
const priceInput = document.querySelector(".price");
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
        <select id="select-product-${count}" class="select-product">
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
        document.getElementById(`subtotal-${i+1}`).value = price * quantity
        
    }

    sumTotal()
}

const sumTotal = () => {
    count
    let totalAmount = ""
    for (let i = 0; i < count; i++) {
        const quantity = document.getElementById(`subtotal-${i+1}`).value
        const subtotal = quantity

        totalAmount += subtotal
        
    }

    document.getElementById('total').value = totalAmount
    
}

function getOption(obj) { 
    const productPrice = obj.options[obj.selectedIndex].getAttribute('data-price');
    priceInput.value = productPrice
} 
