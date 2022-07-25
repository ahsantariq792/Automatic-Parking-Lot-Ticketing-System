import React from 'react'
import Header from '../../Header/Header'
import { Button } from '@material-ui/core'
import './ConfirmationScreen.css'
import { Link } from 'react-router-dom'

const ConfirmationScreen = () => {
    return (
        <div className='container'>
            <Header />
            <div className='heading'><h2>Kindly Confirm Yor Vehicle</h2></div>
            <div className='imgDiv'><img src='https://sc02.alicdn.com/kf/HTB18VtgiRmWBuNkSndVq6AsApXat/228304045/HTB18VtgiRmWBuNkSndVq6AsApXat.jpg_.webp' /></div>
            <div className='butt'>
                <Link to='/billing' className='link'><Button variant="contained">Yes</Button></Link>
                <Link to='/' className='link'><Button variant="contained">No</Button></Link>
            </div>
        </div>
    )
}

export default ConfirmationScreen