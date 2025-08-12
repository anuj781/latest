import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className=' bg-black text-white h-15 flex items-center justify-between p-7'>
      <h1 className='text-3xl'>Enquiry Form</h1>
  <div className='flex w-[200px] justify-between'>
        <button className=' border-2 border-white rounded-md p-2 cursor-pointer'><Link to={'/admin'}>Admin Panel</Link></button>
      <button className=' border-2 border-white rounded-md px-4 py-2 cursor-pointer'><Link to={'/'}>Form</Link></button>
  </div>

    </div>
  )
}

export default Nav
