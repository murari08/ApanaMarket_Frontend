import React, { useEffect, useState } from 'react';
import AdminHeader from '@/AdminnComponent/AdminHeader';
import AdminSidebar from '@/AdminnComponent/AdminSidebar';
import AddProductModal from '@/AdminnComponent/AddProductModal';
import Swal from 'sweetalert2';
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

//   const [product, set]

  const getProduct = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProduct`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log({data})
        setProducts(data)
    }catch(e){
        console.log(e)
    }
  }

  useEffect(()=>{
    getProduct()
  },[])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        try {
            console.log({id})
            debugger
         const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/deleteProduct/${id}`,{
            method:'PUT'
         });
          getProduct();
          Swal.fire('Deleted!', 'Product has been removed.', 'success');
        } catch (error) {
          console.error('Error deleting Product:', error);
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
  };

  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  console.log({data})
  const [type,setType] = useState('1')

  useEffect(()=>{
    const res = localStorage.getItem('adminLogin');
    const data = JSON.parse(res)
    if(!data){
      window.location.href='/admin'
    }
  },[]);

  return (
    <>
      <AdminHeader />
      <div className="admin-layout">
        <AdminSidebar />
        <div className="container">
          <h1>Admin - Products</h1>

          <div className="top-bar">
            <button className="add-btn" onClick={() => {setShowModal(true); setType('2')}}>+ Add Product</button>
            {showModal && <AddProductModal onClose={() => setShowModal(false)} getProduct={getProduct} editData={data} type={type} />}
          </div>

          <div className="grid header">
            <div>Name</div>
            <div>Star</div>
            <div>Price (₹)</div>
            <div>Action</div>
          </div>

          {products.map((p) => (
            <div key={p.Id} className="grid row">
              <div>{p.Name}</div>
              <div className="stars">{'★'.repeat(p.Star)}{'☆'.repeat(5 - p.Star)}</div>
              <div>₹{p.Price}</div>
              <div className="button-group">
                <button className="delete-btn" onClick={() => handleDelete(p.Id)}>Delete</button>
                <button className="edit-btn" onClick={() => {setShowModal(true); setData([p]); setType('1')}}>Edit</button>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .button-group {
            display: flex;
            gap: 10px;
            }

        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        .container {
          flex: 1;
          padding: 30px;
          background-color: #fff;
        }

        h1 {
          margin-bottom: 20px;
          color: #222;
        }

        .top-bar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .add-btn {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .add-btn:hover {
          background-color: #218838;
        }

        .grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
          align-items: center;
          color:black;
        }

        .header {
          font-weight: bold;
          background-color: #f5f5f5;
        }

        .row {
          background-color: #fff;
        }

        .stars {
          color: #ffc107;
          font-size: 18px;
        }

        .delete-btn {
          padding: 6px 12px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background-color: #b02a37;
        }

        .edit-btn {
          padding: 6px 12px;
          background-color:rgb(53, 220, 117);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-btn:hover {
          background-color:rgb(42, 176, 102);
        }
      `}</style>
    </>
  );
}
