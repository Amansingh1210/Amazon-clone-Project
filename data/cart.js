export let cart =  JSON.parse(localStorage.getItem('cart'));
if(!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }
];
}

// FUNCTION TO SAVE CART TO LOCAL STORAGE 
export function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}
// FUNCTION TO ADD PRODUCT TO CARAT 
export function addToCart(productId){
      
    let matchingItem ; 
        
    cart.forEach((cartItem)=>{
        if (productId==cartItem.productId){
            matchingItem = cartItem ;
        }
    });

    const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number.parseInt(quantitySelector.value)

    if(matchingItem){
        matchingItem.quantity += quantity;
    }
    else {
    cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
       })
    }

    saveToStorage();
}
// FUNCTION TO DELETE PRODUCT FROM CART
export function deleteItem(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}
// FUNCTION TO UPADATE DELIVERY OPTIONS 
export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem ; 

    cart.forEach((cartItem)=>{
        if (productId === cartItem.productId){
            matchingItem = cartItem ;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

