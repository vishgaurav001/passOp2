import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'
const App = () => {
  return (
    < div className=''>
      <Navbar />
      <div className='overflow-auto  max-h-[83vh] min-h-[82vh]'>
        <Manager />
      </div>
      <div className='sticky bottom-0'>
         <Footer />
      </div>
    </div>
  )
}

export default App
