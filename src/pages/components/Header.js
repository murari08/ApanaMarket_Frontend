import { useState, useEffect } from 'react';
import Link from 'next/link';
import SignupPage from './SignUp';
import LoginList from './Login';

export default function Header() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setLogin] = useState(false)
    const [loginDetails, setLoginDetail] = useState([])
    console.log({loginDetails})

    useEffect(()=>{
      const res = localStorage.getItem('userLogin')
      const data = JSON.parse(res)
      setLoginDetail(data)
      console.log({data})
    },[])

    const handleLogout = () => {
      localStorage.removeItem("userLogin");
      window.location.reload(); // Corrected to actually reload the page
    };
    

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <span>🛒 ApnaMarket</span>
        </Link>
      </div>
      <nav className="navLinks">
        <Link href="/">Home</Link>
        <Link href="/products">All Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/order">Order Status</Link>
      </nav>
      <div className="authButtons">
        {/* <Link href="/login"> */}
        {
  !loginDetails || Object.keys(loginDetails).length === 0 ? (
    <>
      <button className="btn" onClick={() => setLogin(true)}>Login</button>
      <button className="btn signup" onClick={() => setShowSignUp(true)}>Sign Up</button>
    </>
  ) : (
    <>
     <p>Welcome {loginDetails[0]?.Name}</p>
     <button className="btn signup" onClick={handleLogout} >Logout</button>
    </>
   
    

  )
}


          
      </div>

     
            {showSignUp && (
              <SignupPage setShowSignUp={setShowSignUp} setLogin={setLogin}  />
            )}
            {showLogin && (
              <LoginList setLogin={setLogin} setLoginDetail={setLoginDetail} />
            )}
         



      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          background-color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo span {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0070f3;
          cursor: pointer;
        }

        .navLinks {
          display: flex;
          gap: 20px;
          color: black;
          font-weight: bold;
        }

        .navLinks a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .navLinks a:hover {
          color: #0070f3;
        }

        .authButtons {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 8px 16px;
          background-color: transparent;
          border: 1px solid #0070f3;
          border-radius: 5px;
          color: #0070f3;
          cursor: pointer;
          font-weight: 500;
        }

        .btn.signup {
          background-color: #0070f3;
          color: white;
        }

        .btn:hover {
          opacity: 0.9;
        }
          p{
            color:black; 
          }
      `}</style>
    </header>
  );
}
