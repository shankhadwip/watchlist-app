import React from "react";
import Logo from "../MovieLogo.png";
import "../App.css";
import { Link } from "react-router-dom";


function Navbar({setCurrentPage}) {
        const Home = () =>{  
        useEffect(() => {
          setCurrentPage(1); // Reset page to 1 when Home is clicked
        }, [setCurrentPage]);}
    return (
        <nav className="fixed top-0 left-0 w-full flex items-center gap-8  px-6 z-50  h-[60px]  bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white shadow-md">
        {/* Logo with Background */}
        <div className="bg-yellow-300 p-1 rounded">
        <Link to="/" className="hover:cursor-pointer"> <img className="w-[33px]" src={Logo} alt="Logo"/> </Link>
        </div>
      
        {/* Navigation Links */}
        <Link to="/" onClick={Home} className="text-xl font-semibold leading-none hover:text-red-500 transition">
          Home
        </Link>
        <Link to="/WatchList" onClick={() => (window.location.href = "/WatchList")} className="text-xl font-semibold leading-none hover:text-red-500 transition">
          Watchlist
        </Link>
      </nav>
      
    );
  }

export default Navbar;
