import { useEffect, useState } from 'react';

function ProductSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [productList, setProductList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const getProductNames = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProductName`);
      const data = await res.json();
      setProductList(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductNames();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = productList.filter(item =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, productList]);

  console.log({searchTerm})

  const handleSearch = async (e) => {
    e.preventDefault();
   
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProductByName/${searchTerm}`);
      const data = await res.json();
      onSearch(data);
    }catch(e){
      console.log(e)
    }

  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  const getProduct = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/getProduct`);
      const data = await res.json();
      onSearch(data);
    }catch(e){
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>{
             setSearchTerm(e.target.value)
             let name = e.target.value
             if(name.length == 0){
              getProduct()
             }

          }}
        />
        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((item, idx) => (
              <li key={idx} onClick={() => {
                handleSuggestionClick(item.Name);
                setSuggestions([])
                }}>
                {item.Name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Search</button>

      <style jsx>{`
        .search-bar {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          margin: 20px auto;
          max-width: 600px;
          position: relative;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        input {
          width: 100%;
          padding: 10px 15px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }

        .suggestion-list {
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 5px 5px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 10;
          color: black;
        }

        .suggestion-list li {
          padding: 10px;
          cursor: pointer;
        }

        .suggestion-list li:hover {
          background-color: #f0f0f0;
        }

        button {
          padding: 10px 20px;
          background-color: #0070f3;
          border: none;
          color: white;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
}

export default ProductSearchBar;
