import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-green-800 flex justify-between items-center px-4 h-15'>
      <div className="logo text-2xl text-white">
        
        <span className='text-green-400 font-bold'>&lt;/</span>
        Pass <span className='text-green-950 font-bold'>OP</span>
       
        <span className='text-green-400 font-bold'>&gt;</span>
        </div>
          
         <a href="">
            <button className='bg-green-400 p-2 font-bold  text-white rounded-md'>Git hub</button>
         </a>
    </nav>
  )
}

export default Navbar
