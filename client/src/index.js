import React from 'react';
import ReactDOM from 'react-dom/client';
//import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// const routing = (
//     <Router>
//         <Navbar />
//         <Routes>
//             <Route path='/' exact component={Home} />
//             <Route path='/about' component={About} />
//             <Route path='/events' component={Events} />
//             <Route path='/annual' component={AnnualReport} />
//             <Route path='/team' component={Teams} />
//             <Route path='/blogs' component={Blogs} />
//             <Route path='/sign-up' component={SignUp} />
//         </Routes>
//     </Router>
// )
// ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
