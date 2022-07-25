import { React, useState } from 'react'
import { Button } from '@material-ui/core';
import './Dashboard.css'
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/Context';
import { useContext } from "react";

const Dashboard = () => {

    const [search, setSearch] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const Upload = async () => {
            await fetch('http://localhost:5000', {
                method: 'POST',
                body: formData
            })
                // .then(resp => {
                //     resp.json()
                //         .then(data => { console.log(data) })
                // })
                .then(data => { console.log(data) })

        }
        Upload();
    }

    return (
        <div className='container'>
            <Header />
            <div className='content'>
                <div className="box arrow-bottom">
                    Upload File to proceed
                </div>
                <div className='inputArea'>
                    <form onSubmit={handleSubmit} className="container mt-5 pt-5 pb-5" encType="multipart/form-data">
                        <div>
                            <input type='file' accept="image/*" className='uploadinputField' placeholder="Enter vehicle's registeration number" name="file" required />
                        </div>
                        <div>

                            <div className='uploadbutton'>
                                <Button type="submit" className="uploadbutton" variant="contained" color="primary">Upload</Button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            

        </div >
    )
}

export default Dashboard;