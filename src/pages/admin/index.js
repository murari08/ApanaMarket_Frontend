import React, { useState } from 'react';
import AdminHeader from '@/AdminnComponent/AdminHeader';
import SignupModal from '../components/SignUp';

function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignUp, setSignup] = useState(false)

  const handleSignUpRedirect = () => {
    // Replace with your sign-up page route if you have one
    setSignup(true)
  };

  const [showLogin, setLogin] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}user_login/userLogin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
      console.log({data})
      if (res.ok) {
        localStorage.setItem('token', data.token); 
        alert("Login successful");
        localStorage.setItem('adminLogin', JSON.stringify(data.result) )
        window.location.href='/admin/product'

      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }

  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
          <button type="button" className="signup-btn" onClick={handleSignUpRedirect}>
            Sign Up
          </button>
        </form>

        {
          isSignUp && <SignupModal setShowSignUp={setSignup} setLogin={setLogin}/>
        }

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
          }

          h1 {
            margin-bottom: 20px;
            color: black;
          }

          form {
            display: flex;
            flex-direction: column;
            width: 300px;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }

          input {
            margin-bottom: 15px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background: white;
            color: black;
          }

          button {
            padding: 10px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px;
          }

          button[type="submit"] {
            background-color: #0070f3;
            color: white;
          }

          button.signup-btn {
            background-color: #28a745;
            color: white;
          }

          button.signup-btn:hover {
            background-color: #218838;
          }

          button[type="submit"]:hover {
            background-color: #005bb5;
          }
        `}</style>
      </div>
    </>
  );
}

export default Index;
