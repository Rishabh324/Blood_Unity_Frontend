import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Hospital = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth);

    const getHospitals = async () => {
        try {
            const { data } = await API.get('/inventory/getHospitalRecords');
            if (data?.status == "Success") {
                setData(data?.hospitals);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHospitals();
    }, []);

    return (
        <Layout>
            <div className='container mt-4'>
                <h2 className='text-center mb-3'>Hospital List</h2>
                <table className="table">
                    <thead>
                        <tr className='table-head-row'>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone No.</th>
                            <th scope="row">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.filter(dt => dt.role === "Hospital").map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">{item.name || item.hospitalName || item.organisationName}</th>
                                    <td scope="row">{item.email}</td>
                                    <td scope="row">{item.address}</td>
                                    <td scope="row">{item.phone}</td>
                                    <td scope="row">{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Hospital