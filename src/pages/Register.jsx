import React from 'react'
import RegisterBanner from '../img/logo.png';
import Form from '../components/common/Form';
import Spinner from '../components/common/Spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Register = () => {
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
                            <img src={RegisterBanner} alt='register Banner'></img>
                        </div>
                        <div className='col-md-4 form-container'>
                            <Form header="Register Page" buttonText="Register" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Register;