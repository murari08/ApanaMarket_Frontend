import React, { useState } from 'react';

const order = {
  orderId: 'ORD12345678',
  items: [
    {
      id: 1,
      name: 'Wireless Mouse',
      image: '/mouse.jpg',
      quantity: 1,
      price: 799,
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      image: '/keyboard.jpg',
      quantity: 1,
      price: 2499,
    },
  ],
  total: 3298,
};

const CheckoutPopup = ( props) => {
  const {setCheckout,cartList, getCart} = props
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState('');

  const handleConfirm = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/addOrder`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
        cartList
      })
    })

    const data = await res.json();
    console.log({data})
    if(data.message == "Order stored and entire cart cleared successfully"){
      alert(`Order Placed with Payment Method: ${paymentMethod.toUpperCase()}\nDelivery Address: ${address}`);
      getCart()
      setCheckout(false);
    }
   
  };

  const totalPrice = () => {
    let price =0
    cartList.map((item)=>{
      price+= item.price * item.qty
    })

    return price;
  }

  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-button" onClick={()=> setCheckout(false)}>×</button>
        <h2>✅ Checkout</h2>

        <div className="summary">
          {cartList.map((item) => (
            <div className="item" key={item.Id}>
              <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${item.image}`} alt={item.name} />
              <div className="details">
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}

          <h3 className="total">Total: ₹{totalPrice()}</h3>

          <div className="address-section">
            <h4>Delivery Address:</h4>
            <textarea
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="payment-section">
            <h4>Select Payment Method:</h4>
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          <button className="confirm-btn" onClick={handleConfirm}>Confirm Order</button>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup {
          position: relative;
          background: white;
          padding: 30px 20px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #555;
        }

        h2 {
          text-align: center;
          color: black;
          margin-bottom: 10px;
        }

        .summary {
          margin-top: 20px;
          color: black;
        }

        .item {
          display: flex;
          gap: 15px;
          margin-bottom: 16px;
          align-items: center;
        }

        .item img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
        }

        .details h4 {
          margin: 0;
        }

        .total {
          text-align: right;
          margin-top: 10px;
          font-size: 18px;
          font-weight: 600;
        }

        .address-section {
          margin-top: 20px;
        }

        .address-section h4 {
          margin-bottom: 8px;
        }

        textarea {
          width: 100%;
          height: 60px;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          resize: vertical;
        }

        .payment-section {
          margin-top: 20px;
        }

        .payment-section h4 {
          margin-bottom: 8px;
        }

        .payment-section label {
          font-size: 16px;
        }

        .confirm-btn {
          margin-top: 20px;
          background: #0070f3;
          color: white;
          border: none;
          padding: 12px;
          width: 100%;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .confirm-btn:hover {
          background: #0051c3;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPopup;
