export const cart = [];


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

export function updateCart(){
    let cartQuantity = 0 ;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
}