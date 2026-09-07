import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
