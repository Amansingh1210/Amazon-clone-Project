import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { priceInRupees } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderOrderSummary } from "./orderSummary.js";

export function renderPaymentSummary(){
    let productPrice = 0
    let shippingPrice = 0

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId)
        productPrice +=  priceInRupees(product.priceCents) * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += Number(priceInRupees(deliveryOption.priceCents))
    })

    const totalBeforeTax = productPrice + shippingPrice ;
    const tax = totalBeforeTax * 0.1 ; 
    const totalAfterTax =  tax  + totalBeforeTax;


    const paymentSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">Rs.${productPrice.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">Rs.${shippingPrice.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">Rs.${totalBeforeTax.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">Rs.${tax.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">Rs.${totalAfterTax.toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
    `
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML ;
}