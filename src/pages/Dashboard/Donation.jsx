import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../../services/API';
import Layout from '../../components/Layout';
import moment from 'moment';

const Donation = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth);

    const getDonors = async () => {
        try {
            const { data } = await API.post('/inventory/getBloodRecordsHospital', {
                filters: {
                    inventoryType: "IN",
                    donor: user?._id
                }
            });
            console.log(data);
            if (data?.status == "success") {
                setData(data?.inventory);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDonors();
    }, []);
    return (
        <Layout>
            <div className='container mt-4'>
                <table className="table">
                    <thead>
                        <tr className='table-head-row'>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Inventory Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">{item.bloodGroup}</th>
                                    <td scope="row">{item.inventoryType}</td>
                                    <td scope="row">{item.quantity}</td>
                                    <td scope="row">{item.email}</td>
                                    <td scope="row">{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Donation