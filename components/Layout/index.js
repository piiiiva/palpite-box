import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex-1 container mx-auto">
        {children}
      </div>
      <Footer />
    </div>

  )
}
export default Layout