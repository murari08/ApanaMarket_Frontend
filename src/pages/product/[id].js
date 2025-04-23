import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function ProductDetail() {
  const router = useRouter();
  const [productId, setId] = useState('')
  const { id } = router.query;


  const [product, setProduct] = useState(null);
  console.log({id})
  // Simulate API fetch
  useEffect(() => {
    if (id) {
      // Mock product data (replace with API call)
      setProduct({
        id,
        name: 'Premium Headphones',
        image: 'https://via.placeholder.com/400x300',
        rating: 4.5,
        price: 4999,
        description: 'High-quality wireless headphones with noise cancellation and deep bass.',
      });
    }
  }, [id]);

  const [productDetail, setDetail] = useState()

  const getDetail = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProductById/${id}`)
      const data = await res.json();
      setDetail(data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
      getDetail()
    
  },[id])
  console.log({productDetail})



  if (!productDetail) return <div>Loading...</div>;

  const addCart = async (product) => {
    try{
      const formData = new FormData();
      console.log({product},product[0]?.Image)
      debugger
        formData.append("image", product[0]?.Image);
        formData.append("name", product[0]?.Name);
        formData.append("star", product[0]?.Star);
        formData.append("price", product[0]?.Price);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}cart/addCart`,{
        method:'POST',
        body: formData
      })
      const data = await res.json();
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      if(res.ok){
        window.alert('added to cart')
      }

    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
        <div style={{ backgroundColor: '#D0D0D0', minHeight: '100vh' }}>
            <Header />
            <div className="container">
            <div className="image-section">
                <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${productDetail[0]?.Image}`} alt={productDetail[0]?.Name} />
            </div>

            <div className="details">
                <h1>{productDetail[0]?.Name}</h1>
                <div className="stars"> 
                {'★'.repeat(Math.floor(productDetail[0]?.Star))}
                {'☆'.repeat(5 - Math.floor(productDetail[0]?.Star))}
                </div>
                <p className="price">₹{productDetail[0]?.Price}</p>
                <p className="description">{productDetail[0]?.Descreption}</p>
              
                <button onClick={()=> addCart(productDetail)}>Add to Cart</button>
            </div>

            <style jsx>{`
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
                .container {
                display: flex;
                gap: 40px;
                padding: 40px;
                flex-wrap: wrap;
                color:black;
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
        </div>
       
    </>
    
  );
}
