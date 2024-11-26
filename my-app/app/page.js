"use client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Changed BrowserRouter to HashRouter
import Navbar from "./navbar/page";
import Login from "./login/page";
import Signup from "./signup/page";
import Travels from "./travels/page";
import CarsPage from "./cars/page";
import Footer from "./components/footer";
import Landing from "./landing/page";


export default function Home() {
 
  return (

       <Landing/>

      
  );
}