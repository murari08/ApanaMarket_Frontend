import { useState } from 'react';

function LoginList(props) {
    const {setLogin, setLoginDetail} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        localStorage.setItem('userLogin', JSON.stringify(data.result) )
        setLoginDetail(data.result)
        setLogin(false); 

      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }

  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={()=> setLogin(false)}>X</button>
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
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
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

export default LoginList;
