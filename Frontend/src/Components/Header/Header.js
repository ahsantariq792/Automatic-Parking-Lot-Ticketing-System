import React from 'react'
import './Header.css'
import logo from '../Assets/Images/logo.png'

const Header = () => {
    return (
        <div className='header' >
            <img src={logo} className='logo' />
            <h2>PARKING LOT TICKET SYSTEM</h2>
        </div>

    )
}

export default Header