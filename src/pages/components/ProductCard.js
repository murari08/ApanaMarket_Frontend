import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductCard({ productListBySearch }) {
  const [productList, setProduct] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const getProduct = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProduct`);
      const data = await res.json();
      setProduct(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (productListBySearch) {
      setProduct(productListBySearch);
    }
  }, [productListBySearch]);

  const addCart = async (product) => {
    try {
      const formData = new FormData();
      formData.append("image", product?.Image);
      formData.append("name", product?.Name);
      formData.append("star", product?.Star);
      formData.append("price", product?.Price);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}cart/addCart`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      if (res.ok) {
        window.alert('added to cart');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const productsToShow = showAll ? productList : productList.slice(0, 5);

  return (
    <div style={{ width: '100%' }}>
      <div className="product-list">
        {productsToShow.map((item) => (
          <div key={item.Id} className="card">
            <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${item.Image}`} alt={item.Name} className="productImage" />
            <h3>{item.Name}</h3>
            <div className="stars">{'★'.repeat(item.Star)}{'☆'.repeat(5 - item.Star)}</div>
            <div>Price : ₹ {item.Price}</div>
            <div className="button-group">
              <button onClick={() => addCart(item)}>Add to Cart</button>
              <button onClick={() => router.push(`/product/${item.Id}`)}>Detail</button>
            </div>
          </div>
        ))}
      </div>

      {productList.length > 5 && (
        <div className="view-all-container">
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}

      <style jsx>{`
        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .card {
          border: 1px solid #e0e0e0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          max-width: 280px;
          text-align: center;
          background: white;
          transition: transform 0.2s;
          color: black;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        .productImage {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        h3 {
          margin: 10px 0;
          font-size: 18px;
        }

        .stars {
          color: #ffc107;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .button-group {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }

        .view-all-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
