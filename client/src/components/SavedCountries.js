// import React from "react";
// import {Table} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
//
// const SavedCountries = () => {
//     const[userData, setUserData] = React.useState([])
//     const[userSearchData, setUserSearchData] = React.useState([]);
//     const[country, setCountry] = React.useState('');
//     const[status, setStatus] = React.useState('');
//
//         // React.useEffect(() => {
//         //     if (userData.length < 1) {
//         //         axios.get("/countriesDB")
//         //             .then(
//         //                 res => {
//         //                     // console.log(res)
//         //                     const countriesData = res.data["data"];
//         //                     setUserData(countriesData)
//         //                     setUserSearchData(countriesData)
//         //                 }
//         //             )
//         //     }
//         // }, [])
//
//     // const handleUpdateDB = () => {
//     //     axios.post("/countriesDB", {data: "True"})
//     //         .then(
//     //             res => {
//     //                 console.log(res)
//     //                 const countriesData = res.data["data"];
//     //                 setUserData(countriesData)
//     //                 setUserSearchData(countriesData)
//     //             }
//     //         )
//     // }
//     const handleSearch = () => {
//         const newData =
//             userData
//                 .filter(x => x.country_name === (country === '' ? x.country_name : country))
//                 .filter(y => y.country_status === (status === '' ? y.country_status : status))
//         setUserSearchData(newData)
//
//     }
//
//     return (
//         <div>
//             <Table>
//                 <tr>
//                     <td>
//                         <input class="form-control" type='text' placeholder="Enter country..." onChange={(e) => setCountry(e.target.value)}/>
//                     </td>
//                     <td>
//                         <select className="form-control" onChange={(e)=> setStatus(e.target.value)}>
//                             <option value=''>-Select-</option>
//                             <option value='Low Risk'>Low Risk</option>
//                             <option value='Medium Risk'>Medium Risk</option>
//                             <option value='High Risk'>High Risk</option>
//                             <option value='Unknown'>Unknown</option>
//                         </select>
//                     </td>
//                     <td>
//                         <button type="button" class="btn btn-outline-primary" onClick={()=> handleSearch()}>Search</button>
//                         <button type="button" class="btn btn-outline-primary" onClick={() => handleUpdateDB()}>Update Database!</button>
//                     </td>
//                 </tr>
//             </Table>
//
//             <Table responsive stripped size="sm">
//                 <thead>
//                 <tr>
//                     <th>Country Code</th>
//                     <th>Name</th>
//                     <th>Status</th>
//                     <th>Status Overridden?</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {
//                     userSearchData && userSearchData.length >0 ?
//                         userSearchData.map(item =>
//                             <tr>
//                                 <td>{item.country_code}</td>
//                                 <td>{item.country_name}</td>
//                                 <td>{item.country_status}</td>
//                                 <td>{item.isStatusOveridden}</td>
//                             </tr>
//                         )
//                         : 'No data'
//                 }
//                 </tbody>
//             </Table>
//             <h1>This page should only appear once the user is logged in</h1>
//         </div>
//     );
// };
//
// export default SavedCountries;
