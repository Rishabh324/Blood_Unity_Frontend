import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from "../img/logo_new.png";
const Header = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/login');
        toast.success("Logout Successful.");
    }
    return (
        <div className='header'>
            <nav className='navbar' style={{ backgroundColor: "#53BAC1" }}>
                <div className='container-fluid mx-4'>
                    <div className='navbar-brand' onClick={() => navigate('/')}><img className='me-2' src={Logo} width="250px" style={{ paddingTop: "10px", cursor: "pointer" }}></img></div>
                    <ul className='navbar-nav flex-row align-items-center'>
                        <li className='nav-item mx-3'>
                            <p className='nav-link mt-2' style={{ fontSize: "1.2rem" }}>Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
                                <span className="badge bg-secondary">{user?.role}</span>
                            </p>
                        </li>
                        {
                            user?.role !== "Admin" && (location.pathname === "/analytics" ? (
                                <li className='nav-item mx-3'>
                                    <Link to="/" className='nav-link'>
                                        Home
                                    </Link>
                                </li>
                            ) : (
                                <li className='nav-item mx-3'>
                                    <Link to="/analytics" className='nav-link'>
                                        Analytics
                                    </Link>
                                </li>
                            ))
                        }
                        {
                            (user?.role === "Admin" && (location.pathname !== "/admin")) && (
                                <li className='nav-item mx-3' style={{ fontSize: "1.2rem" }}>
                                    <Link to="/" className='nav-link'>
                                        Home
                                    </Link>
                                </li>
                            )
                        }
                        <li className='nav-item mx-3'>
                            <button className='btn' style={{ backgroundColor: "#194F92", color: "white", borderRadius: "25px 25px 25px 25px" }} onClick={logoutHandler}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header