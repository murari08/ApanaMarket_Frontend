export default function ProductDetail() {
    const product = {
      name: 'Premium Headphones',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.5,
      price: 4999,
      description: 'High-quality wireless headphones with noise cancellation and deep bass.',
    };
  
    return (
      <div className="container">
        <div className="image-section">
          <img src={product.image} alt={product.name} />
        </div>
  
        <div className="details">
          <h1>{product.name}</h1>
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <button>Add to Cart</button>
        </div>
  
        <style jsx>{`
          .container {
            display: flex;
            gap: 40px;
            padding: 40px;
            flex-wrap: wrap;
          }
  
          .image-section img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
  
          .details {
            flex: 1;
            min-width: 300px;
          }
  
          h1 {
            margin-bottom: 10px;
          }
  
          .stars {
            color: gold;
            font-size: 20px;
            margin-bottom: 10px;
          }
  
          .price {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 15px;
          }
  
          .description {
            margin-bottom: 20px;
            color: #555;
          }
  
          button {
            background-color: #0070f3;
            color: white;
            padding: 12px 20px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
  
          button:hover {
            background-color: #005bb5;
          }
        `}</style>
      </div>
    );
  }
  