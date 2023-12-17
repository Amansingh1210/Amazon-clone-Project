export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
    }
];

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
        quantity: quantity
    })
    }
}
// FUNCTION TO UPDATE CART QUANTITY
export function updateCart(){
    let cartQuantity = 0 ;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
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
}

