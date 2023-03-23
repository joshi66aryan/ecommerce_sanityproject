import React from 'react'
import Head from 'next/head'  // same as head tag in html
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
      <div  className='layout'>
        <Head>
          <title>Headset Hub</title>
        </Head>
        <header>
          <Navbar/>
        </header>
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    </div>
  )
}

export default Layout