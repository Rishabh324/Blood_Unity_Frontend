import React from 'react';
import LoginBanner from '../img/logo.png';
import Form from '../components/common/Form';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { toast } from 'react-toastify';

const Login = () => {

    const { loading, error } = useSelector(state => state.auth);

    return (
        <>
            {error && <span>{toast.error(error)}</span>}
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='row g-0'>
                        <div className='col-md-8 form-banner'>
                            <img src={LoginBanner} alt='Login Banner'></img>
                        </div>
                        <div className='col-md-4 form-container'>
                            <Form header="Login Page" buttonText="Login" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login;