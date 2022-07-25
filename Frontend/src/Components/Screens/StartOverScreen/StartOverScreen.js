import React from 'react'
import { Button } from '@material-ui/core'
import Header from '../../Header/Header'
import logo from '../../Assets/Images/logo.png'
import './StartOver.css'
import { Link } from 'react-router-dom'

const StartOverScreen = () => {
    return (
        <div className='container'>
            <img className='logo' src={logo} />
            <div><h2 className='safe'>Have a safe drive.</h2></div>
            <Link to='/' className='link'>
                <div><Button variant="contained">Start Over</Button></div>
            </Link>

        </div>
    )
}

export default StartOverScreen