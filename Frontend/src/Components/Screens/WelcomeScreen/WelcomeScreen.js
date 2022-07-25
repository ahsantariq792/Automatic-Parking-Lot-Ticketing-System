import { React, useState } from 'react'
import { Button } from '@material-ui/core';
import './WelcomeScreen.css'
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/Context';
import { useContext } from "react";

const WelcomeScreen = () => {

    const [details, setdetails] = useState()
    const [search, setSearch] = useState()
    let { state, dispatch } = useContext(GlobalContext);


    const SearchData = async () => {
        console.log(search)
        await fetch('http://localhost:5000/carsdetails2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "search": search
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res)
                setdetails(res[0])
                console.log(details)
                if (res[0].numberplate) {
                    dispatch({
                        type: "USER_LOGIN",
                        payload: {
                            numberplate: res[0].numberplate,
                            arrival_time: res[0].arrival_time,
                            deptime: res[0].deptime,
                            carparkedtime: res[0].carparkedtime,
                            totalAmount: res[0].totalAmount,
                        }
                    })
                }
            })
    }

    return (
        <div className='container'>
            <Header />
            <div className='content'>
                <div className="box arrow-bottom">
                    6 characters required. Should be in the format xx-xxxx or xxx-xxx.
                </div>
                <div className='inputArea'>
                    <input type='text' className='inputField' placeholder="Enter vehicle's registeration number" onChange={(e) => {
                        setSearch(e.target.value)
                        console.log(search)
                    }} required />
                </div>
            </div>
            <div className='buttons'>
                <Link to='/dashboard' className='link'>
                    <div className='footer'>
                        <Button variant="contained" className='btn'>Upload Image</Button>
                    </div>
                </Link>

                <Link to='/billing' className='link'>
                    <div className='footer'>
                        <Button variant="contained" color="primary" onClick={SearchData}>Next</Button>
                    </div>
                </Link>


            </div>
        </div>
    )
}

export default WelcomeScreen