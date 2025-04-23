import Link from 'next/link';

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Menu</h2>
      <ul>
        <li>
          <Link href="/admin/product">🛍️ Product</Link>
        </li>
      </ul>

      <style jsx>{`
        .admin-sidebar {
          width: 200px;
          height: 100vh;
          background-color: #f4f4f4;
          padding: 20px;
          border-right: 1px solid #ddd;
          color:black;
        }

        h2 {
          font-size: 18px;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 15px;
        }

        a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        a:hover {
          color: #0070f3;
        }
      `}</style>
    </aside>
  );
}

export default AdminSidebar;