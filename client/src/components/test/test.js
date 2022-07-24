"use strict";
function Cart(props) {
    var calculateTotal = function () {
        return items.reduce(function (ack, item) { return ack + props.item.amount * item.price; }, 0);
    };
  return 
    Your Shopping;
    Cart < /h2>;
    {
        cartItems.length === 0 ? No : ;
        items in cart. < /p> : null};
        {
            cartItems.map(function (item) { return key = { item: item, : .id }; }, item = { item: item }, addToCart = { addToCart: addToCart }, removeFromCart = { removeFromCart: removeFromCart }
                /  >
            );
        }
        Total;
        $;
        {
            calculateTotal(cartItems).toFixed(2);
        }
        /h2>
            < /Wrapper>;
    }
};
;
;
exports.default = Cart;
