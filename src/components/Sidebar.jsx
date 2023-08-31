import React from 'react'
import { userMenu } from './userMenu'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    return (
        <div>
            <div className='sidebar'>
                <div className='menu'>
                    {
                        user?.role === "Organisation" && (
                            <>
                                <div className={`menu-item ${location.pathname === "/" && 'active'}`} >
                                    <i className="menu-icon fa-solid fa-warehouse"></i>
                                    <Link to="/">Inventory</Link>
                                </div>
                                <div className={`menu-item ${location.pathname === "/donor" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-hand-holding-medical"></i>
                                    <Link to="/donor">Donor</Link>
                                </div>
                                <div className={`menu-item ${location.pathname === "/hospital" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-hospital"></i>
                                    <Link to="/hospital">Hospitals</Link>
                                </div>
                            </>
                        )
                    }
                    {
                        user?.role === "Admin" && (
                            <>
                                <div className={`menu-item ${location.pathname === "/donor-list" && 'active'}`} >
                                    <i className="menu-icon fa-solid fa-warehouse"></i>
                                    <Link to="/donor-list">Donor List</Link>
                                </div>
                                <div className={`menu-item ${location.pathname === "/hospital-list" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-hand-holding-medical"></i>
                                    <Link to="/hospital-list">Hospital List</Link>
                                </div>
                                <div className={`menu-item ${location.pathname === "/org-list" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-hospital"></i>
                                    <Link to="/org-list">Organisation List</Link>
                                </div>
                            </>
                        )
                    }
                    {
                        (user?.role === "Donor" || user?.role === "Hospital") && (
                            <>
                                <div className={`menu-item ${location.pathname === "/" && 'active'}`} >
                                    <i className="menu-icon fa-solid fa-warehouse"></i>
                                    <Link to="/">Inventory</Link>
                                </div>
                                <div className={`menu-item ${(location.pathname === "/organisation") && 'active'}`}>
                                    <i className="menu-icons fa-solid fa-building-ngo"></i>
                                    <Link to="/organisation">Organisations</Link>
                                </div>
                            </>
                        )
                    }
                    {
                        user?.role === "Hospital" && (
                            <>
                                <div className={`menu-item ${location.pathname === "/consumer" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-building-ngo"></i>
                                    <Link to="/consumer">Consumer</Link>
                                </div>
                            </>
                        )
                    }
                    {
                        user?.role === "Donor" && (
                            <>
                                <div className={`menu-item ${location.pathname === "/donor" && 'active'}`}>
                                    <i className="menu-icon fa-solid fa-building-ngo"></i>
                                    <Link to="/donor">Donor</Link>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;