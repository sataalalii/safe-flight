import React from "react";
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

const FS = () => {
    const[userData, setUserData] = React.useState([])
    const[userSearchData, setUserSearchData] = React.useState([]);
    const[country, setCountry] = React.useState('');
    const[status, setStatus] = React.useState('');

    React.useEffect(()=>{
        // const data = Axios.get("/AirlinesDB");
        const data = [
            {country: "France", city: "Paris", airport: "Paris Charles de Gaulle Airport", status: "Safe"},
            {country: "Japan", city: "Tokyo", airport: "Haneda Airport", status: "Safe"},
            {country: "Japan", city: "Tokyo", airport: "Narita International Airport", status: "Safe"},
            {country: "Germany", city: "Berlin", airport: "Berlin Brandenburg Airport", status: "Safe"},
        ];

        setUserData(data);
        setUserSearchData(data);
    },[])

    const handleSearch = () => {
        const newData =
            userData
                .filter(x => x.country === (country === '' ? x.country : country))
                .filter(y => y.status === (status === '' ? y.status : status))
        setUserSearchData(newData)

    }

    const handleGetData = () => {
        // making a request to backend for flight search.
        Axios.get("/airportsDB").then(res => {
            console.log(res)
        });
    }

    return (
        <div>
            <Table>
                <tr>
                    <td>
                        <input class="form-control" type='text' placeholder="Enter country..." onChange={(e) => setCountry(e.target.value)}/>
                    </td>
                    <td>
                        <select className="form-control" onChange={(e)=> setStatus(e.target.value)}>
                            <option value=''>-Select-</option>
                            <option value='Safe'>Safe</option>
                            <option value='Unsafe'>Unsafe</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" onClick={()=> handleSearch()}>Search</button>
                        <button type="button" onClick={() => handleGetData()}>Get Airports DB!</button>
                    </td>
                </tr>
            </Table>

            <Table responsive stripped size="sm">
                <thead>
                <tr>
                    <th>Country</th>
                    <th>City</th>
                    <th>Airport</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    userSearchData && userSearchData.length >0 ?
                        userSearchData.map(item =>
                            <tr>
                                <td>{item.country}</td>
                                <td>{item.city}</td>
                                <td>{item.airport}</td>
                                <td>{item.status}</td>
                            </tr>
                        )
                        : 'No data'
                }
                </tbody>
            </Table>
            <h1>This page should only appear once the user is logged in</h1>
        </div>
    );
};

export default FS;
