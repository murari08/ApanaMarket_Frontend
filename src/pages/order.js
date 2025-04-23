import React, { useEffect, useState } from 'react';
import Header from './components/Header';

const dummyOrders = [
  {
    id: 1,
    name: 'Bluetooth Headphones',
    image: '/headphones.jpg',
    rating: 4,
    quantity: 2,
    price: 1200,
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: '/watch.jpg',
    rating: 5,
    quantity: 1,
    price: 2500,
  },
];

const OrdersPage = () => {

  const [orderList, setOrder] = useState([])

  const getOrder = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/getOrder`);
      const data = await res.json();
      setOrder(data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getOrder()
  },[])

  return (
    <>
        <Header />
         <div className="container">
      <h1>Your Orders Status</h1>

      <div className="orders-list">
        {orderList.map((order) => (
          <div className="order-card" key={order.Id}>
            <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${order.Image}`} alt={order.Name} />
            <div className="order-info">
              <h3>{order.Name}</h3>
              <p className="stars">{'⭐'.repeat(order.star)}</p>
              <p>Quantity: {order.Qty}</p>
              <p className="price">₹{order.Price}</p>
              <p className={`status ${order.Status?.toLowerCase() || 'shipped'}`}>{order.Status || 'Shipped'}</p>
            </div>
          </div>
        ))}


      </div>

      <style jsx>{`
        .status {
          margin-top: 8px;
          padding: 4px 10px;
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          border-radius: 5px;
          background-color: #e0e0e0;
          color: #333;
        }

        .status.shipped {
          background-color: #e0f7e9;
          color: #1b5e20;
        }

        .status.pending {
          background-color: #fff8e1;
          color: #ff6f00;
        }

        .status.cancelled {
          background-color: #fdecea;
          color: #c62828;
        }

        .container {
          padding: 40px 20px;
          background: white;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: black;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
          color : black;
        }

        .order-card {
          display: flex;
          background: #f9f9f9;
          border-radius: 10px;
          padding: 15px;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .order-info h3 {
          margin: 0 0 5px;
        }

        .stars {
          color: gold;
        }

        .price {
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
    </>
   
  );
};

export default OrdersPage;
