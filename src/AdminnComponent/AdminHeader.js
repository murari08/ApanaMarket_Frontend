import { useState } from 'react';
import Link from 'next/link';

function AdminHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace this with actual auth logic

  const handleLogout = () => {
    // Clear tokens or session data here
    setIsLoggedIn(false);
    // Optionally redirect
    window.location.href = '/admin';
  };

  return (
    <header className="admin-header">
      <div className="logo">
        <Link href="/">
          <span>🛒 AdminPanel</span>
        </Link>
      </div>
      <div className="nav">
        {isLoggedIn ? (
          <button onClick={()=> window.location.href='/admin'}>Logout</button>
        ) : (
          <Link href="/admin/login">
            <button>Login</button>
          </Link>
        )}
      </div>

      <style jsx>{`
        .admin-header {
          background-color: #222;
          color: white;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo span {
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
        }

        .nav button {
          padding: 8px 16px;
          background-color: #0070f3;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        .nav button:hover {
          background-color: #0051aa;
        }
      `}</style>
    </header>
  );
}

export default AdminHeader;
