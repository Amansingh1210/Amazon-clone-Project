import { cart , deleteItem , updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { priceInRupees } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";



export function renderOrderSummary(){

let completeCart = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId ; 

    let matchingProduct ; 
    products.forEach((product) =>{
        if(product.id === productId){
            matchingProduct = product ; 
        }
    })
    let deliveryOption =[];
    const  deliveryOptionID = cartItem.deliveryOptionId;
    // console.log(deliveryOptionID);
    deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionID){
        deliveryOption = option
      }
      // console.log(option.id);
    });
    // console.log(deliveryOption);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateSring = deliveryDate.format('dddd,MMMM D')
    completeCart += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateSring}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
          Rs.${priceInRupees(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>
    `
  });
 
 function deliveryOptionsHTML(matchingProduct,cartItem) {
   let deliveryHTML = '';
   
   deliveryOptions.forEach((deliveryOption)=>{
     
     const today = dayjs();
     const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
     const dateSring = deliveryDate.format('dddd,MMMM D')
     
     const priceSring = deliveryOption.priceCents === 0 ? `Free` : `Rs.${priceInRupees(deliveryOption.priceCents)}-`;
     
     const isChecked =  deliveryOption.id === cartItem.deliveryOptionId ;
    //  console.log(isChecked);
     
     deliveryHTML += `
      <div class="delivery-option js-delivery-options"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
         <input type="radio" 
           ${isChecked ? 'checked' : ""} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
       <div>
          <div class="delivery-option-date">
             ${dateSring}
          </div>
          <div class="delivery-option-price">
             ${priceSring} - Shipping
          </div>
       </div>
      </div>
     `
   });
   
   return deliveryHTML ;
  }

document.querySelector(".js-order-summary").innerHTML = completeCart ;

document.querySelectorAll(".js-delete-link").forEach((link)=>{
  link.addEventListener('click',()=>{
   const productId =  link.dataset.productId;
    deleteItem(productId);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  })
});

let itemQuantity = 0 ;
cart.forEach((cartItem) => {
    itemQuantity += cartItem.quantity
  })
document.querySelector(".js-item-quantity").innerHTML = itemQuantity+ " items" ; 


document.querySelectorAll(".js-delivery-options").forEach((element)=>
{
  element.addEventListener('click',()=>{
    const {productId , deliveryOptionId} = element.dataset ;
    updateDeliveryOption(productId , deliveryOptionId);
    renderOrderSummary(); 
  })
});

}
