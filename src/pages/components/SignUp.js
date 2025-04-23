import { useState } from 'react';

function SignupModal(props) {
  const {setShowSignUp, setLogin} = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email, 'Password:', password);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}user_login/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token); // store JWT
        alert("Signup successful!");
        setShowSignUp(false);
        setLogin(true)
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <button className="close-button" onClick={()=>setShowSignUp(false)}>X</button>
      </div>

      <style jsx>{` 
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0,0,0,0.4);
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 320px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          margin-bottom: 20px;
          color: black;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input {
          margin-bottom: 15px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          padding: 10px;
          font-size: 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 20px;
          color: #666;
          cursor: pointer;
        }

        .close-button:hover {
          color: black;
        }
      `}</style>
    </div>
  );
}

export default SignupModal;
