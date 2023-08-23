import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import API from '../services/API';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const { loading, error, user } = useSelector(state => state.auth);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getBloodRecords = async () => {
        try {
            const { data } = await API.get('/inventory/getBloodRecords');
            if (data?.status === "success") {
                setData(data?.inventory);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBloodRecords();
    }, []);

    return (
        <Layout>
            {user?.role === "Admin" && navigate('/admin')}
            {error && <span>{toast.error(error)}</span>}
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='home container'>
                        <p className='ms-3 mt-4' style={{ cursor: 'pointer', borderRadius: "15px", backgroundColor: "#FF0000", padding: "10px", width: "max-content", color: "white" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i className="fa-solid fa-plus me-2" />Add Inventory
                        </p>
                        <Modal />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Blood Group</th>
                                    <th scope="col">Inventory Type</th>
                                    <th scope="col">Quantity(in ml)</th>
                                    <th scope="col">Donor Email</th>
                                    <th scope="col">Time & Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item) => (
                                        <tr key={item._id}>
                                            <th scope="row">{item.bloodGroup}</th>
                                            <td scope="row">{item.inventoryType}</td>
                                            <td scope="row">{item.quantity} ml</td>
                                            <td scope="row">{item.email}</td>
                                            <td scope="row">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </Layout>
    )
}

export default Home;