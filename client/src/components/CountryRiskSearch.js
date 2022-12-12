import React from "react";
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const CS = () => {
    // const[airportsData, setAirportsData] = React.useState([])
    const[userData, setUserData] = React.useState([])
    const[userSearchData, setUserSearchData] = React.useState([]);
    const[country, setCountry] = React.useState('');
    const[status, setStatus] = React.useState('');

        React.useEffect(() => {
            if (userData.length < 1) {
                axios.get("/countriesDB")
                    .then(
                        res => {
                            // console.log(res)
                            const countriesData = res.data["data"];
                            setUserData(countriesData)
                            setUserSearchData(countriesData)
                        }
                    )
            }
        }, [])

    const handleUpdateDB = () => {
        axios.post("/countriesDB", {data: "True"})
            .then(
                res => {
                    console.log(res)
                    const countriesData = res.data["data"];
                    setUserData(countriesData)
                    setUserSearchData(countriesData)
                }
            )
    }
    const handleSearch = () => {
        const newData =
            userData
                .filter(x => x.country_name === (country === '' ? x.country_name : country))
                .filter(y => y.country_status === (status === '' ? y.country_status : status))
        setUserSearchData(newData)

    }

    const handleFavouritePlace = (e) => {
            // console.log(e.target.value, e.target.checked)
            axios.post("/addFavourites", {request_data: {data: e.target.value, isChecked: e.target.checked}}).then(
                res =>  {
                    console.log(res)
                }
            )
    }

    if (localStorage.getItem("idToken") === "null") {
        return (<div><h1>Please log in to access this page.</h1></div>);
    } else {
        return (
            <div>
                <Table>
                    <tr>
                        <td>
                            <input class="form-control" type='text' placeholder="Enter country..."
                                   onChange={(e) => setCountry(e.target.value)}/>
                        </td>
                        <td>
                            <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                <option value=''>-Select-</option>
                                <option value='Low Risk'>Low Risk</option>
                                <option value='Medium Risk'>Medium Risk</option>
                                <option value='High Risk'>High Risk</option>
                                <option value='Unknown'>Unknown</option>
                            </select>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-primary"
                                    onClick={() => handleSearch()}>Search
                            </button>
                            <button type="button" class="btn btn-outline-primary"
                                    onClick={() => handleUpdateDB()}>Update Database!
                            </button>
                        </td>
                    </tr>
                </Table>

                <Table responsive stripped size="sm">
                    <thead>
                    <tr>
                        <th>Add to Favourites?</th>
                        <th>Country Code</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userSearchData && userSearchData.length > 0 ?
                            userSearchData.map(item =>
                                <tr>
                                    <td>{<input type="checkbox" checked ={item.inFavourites !== undefined ? true : false}
                                                onChange={(e) => handleFavouritePlace(e)}/>}</td>
                                                {/* <td>{console.log(item.inFavourites)}</td> */}
                                    <td>{item._id}</td>
                                    <td>{item.country_name}</td>
                                    <td>{item.country_status}</td>
                                </tr>
                            )
                            : 'No data'
                    }
                    </tbody>
                </Table>

            </div>
        );
    }
};

export default CS;
