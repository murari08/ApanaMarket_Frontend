  import React from "react";
  import Head from "next/head";
  import Image from "next/image";
  import { Geist, Geist_Mono } from "next/font/google";
  import styles from "@/styles/Home.module.css";
  import Header from "./components/Header";
  import ProductSearchBar from './components/ProductSearch';
  import ProductCard from "./components/ProductCard";
  import { useState } from "react";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });


  export default function Home() {
    const [productListBySearch, setProductList] = useState([]);
    const handleSearch = (query) => {
      console.log('Searching for:', query);
      setProductList(query)
      // Add logic to filter product list based on query
    };


    return (
      <>
        <Head>
          <title>Apna Market</title>
          <meta name="description" content="Apna Market" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div style={{ backgroundColor: '#D0D0D0', minHeight: '100vh' }}>
    <Header />
    <ProductSearchBar onSearch={handleSearch} />
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
      <ProductCard productListBySearch={productListBySearch}
      />
    </div>
  </div>


        
      </>
    );
  }
