import React from "react";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout;