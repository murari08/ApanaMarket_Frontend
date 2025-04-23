import { useEffect, useState } from 'react';

export default function AddProductModal(props) {
    const { onClose,getProduct,type, editData} = props;
  const [product, setProduct] = useState({
    name: '',
    price: '',
    rating: 1,
    description: '',
    image: '',
  });

  useEffect(()=>{
    if(editData?.length > 0){
         setProduct({
        name: editData[0]?.Name || '',
        price: editData[0]?.Price || '',
        rating: editData[0]?.Star || 1,
        description: editData[0]?.Descreption ||'',
        image: editData[0]?.Image || '',
         })
    }
   
  },[editData])

  useEffect(()=>{
    if(type == '2'){
        setProduct({
            name: '',
            price: '',
            rating: 1,
            description: '',
            image: '',
        });
    }
  }, type)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    try{
        if(type == '1'){
            const formData = new FormData();
            if (product.image instanceof File) {  // Only append image if a new file is selected
                formData.append("productimg", product.image);
              }
            formData.append("name", product.name);
            formData.append("star", product.rating);
            formData.append("price", product.price);
            formData.append("descreption", product.description);
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/updateProduct/${editData[0]?.Id}`, {
                method: "PUT",
                body: formData
              });
    
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            if(res.ok){
                setProduct({
                    name: '',
                    price: '',
                    rating: 1,
                    description: '',
                    image: '',
                });
                getProduct();
                onClose();
            }
        }else if(type == '2'){
            const formData = new FormData();
        formData.append("productimg", product.image);
        formData.append("name", product.name);
        formData.append("star", product.rating);
        formData.append("price", product.price);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/addProduct`,{
            method: 'POST',
            body: formData
        })

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        if(res.ok){
            setProduct({
                name: '',
                price: '',
                rating: 1,
                description: '',
                image: '',
            });
            getProduct();
            onClose();
        }
        }
        

    }catch(e){
        console.log('error while adding', e)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload}  />
          {type === '1' && product.image && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', overflow: 'hidden', borderRadius: '4px' }}>
                <img
                    alt="Preview"
                    src={typeof product.image === 'string' 
                        ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_API}${product.image}` 
                        : URL.createObjectURL(product.image)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                </div>
                
            </div>
            )}


            <label style={{ margin: 0 }}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <label>Star Rating:</label>
          <select name="rating" value={product.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star
              </option>
            ))}
          </select>

          <label>Price (₹):</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Product</button>
        </form>

        <button className="close-button" onClick={onClose}>X</button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 100%;
          max-width: 450px;
          position: relative;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          color:black;
        }

        label {
          font-weight: 500;
          color: #444;
        }

        input[type="text"],
        input[type="number"],
        select,
        textarea {
          padding: 10px;
          font-size: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background:white;
          color:black
        }

        input[type="file"] {
          padding: 6px;
          color:black;
        }

        button[type="submit"] {
          padding: 12px;
          font-size: 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        button[type="submit"]:hover {
          background-color: #218838;
        }

        .close-button {
          position: absolute;
          top: 12px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 20px;
          color: #666;
          cursor: pointer;
        }

        .close-button:hover {
          color: #000;
        }
      `}</style>
    </div>
  );
}
