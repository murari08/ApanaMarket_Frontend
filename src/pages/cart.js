import { useEffect, useState } from 'react';
import Header from './components/Header';
import CheckoutPopup from './components/CheckoutPage';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      quantity: 2,
      price: 2500,
      image: '/images/headphones.jpg',
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      quantity: 1,
      price: 1999,
      image: '/images/speaker.jpg',
    },
  ]);

  const getTotal = () => {
    return cartList.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const handleRemove = (id) => {
    setCart(cartList.filter((item) => item.Id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.Id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.Id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const [isCheckout, setCheckout] = useState(false)

  const [cartList, setCart] = useState([])

  const getCart = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}cart/getCart`)
      const data = await res.json();
      console.log(data)
      setCart(data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getCart()
  },[])

  return (
    <>
        <Header />
        <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cartList.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <>
            <div className="cart-list">
                {cartList.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${item.image}`}  alt={item.name} />
                    <div className="details">
                    <h3>{item.name}</h3>
                    <div className="qty-controls">
                        <button onClick={() => decreaseQty(item.Id)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item.Id)}>+</button>
                    </div>
                    <p>Price: ₹{item?.price}</p>
                    <p>Total: ₹{item.price * item.qty}</p>
                    <button onClick={() => handleRemove(item.Id)} className="remove">Remove</button>
                    </div>
                </div>
                ))}
            </div>
            <div className="checkout">
                <h2>Total: ₹{getTotal()}</h2>
                <button className="buy-btn" onClick={()=> setCheckout(true)}>Place order</button>
                {
                    isCheckout && <CheckoutPopup getCart={getCart} setCheckout={setCheckout} cartList={cartList} />
                }
            </div>
            </>
        )}

        <style jsx>{`
            .cart-page {
            padding: 40px;
            max-width: 100%;
            margin: auto;
            background: #D0D0D0;
            color: black;
            }

            h1 {
            text-align: center;
            margin-bottom: 30px;
            }

            .cart-list {
            display: flex;
            flex-direction: column;
            gap: 30px;
            }

            .cart-item {
            display: flex;
            gap: 20px;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 10px;
            background-color: #f9f9f9;
            color:black;
            }

            .cart-item img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
            }

            .details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: black;
            }

            .qty-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            color:black;
            }

            .qty-controls button {
            background-color: white;
            border: 1px solid #ccc;
            padding: 5px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            color:black;
            }

            .remove {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            max-width: 100px;
            }

            .remove:hover {
            background-color: #b02a37;
            }

            .checkout {
            margin-top: 40px;
            text-align: right;
            color: black;
            }

            .buy-btn {
            padding: 12px 24px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            }

            .buy-btn:hover {
            background-color: #218838;
            }
        `}</style>
        </div>
    </>
    
  );
}
