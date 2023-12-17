export function  priceInRupees(priceCents){
    return ((priceCents/100)*83.04).toFixed(2);
}