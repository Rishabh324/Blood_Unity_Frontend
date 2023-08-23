import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import API from '../../services/API';

const Donor = () => {
    const [data, setData] = useState([]);

    const getDonors = async () => {
        try {
            const { data } = await API.get('/inventory/getDonorRecords');
            console.log(data);
            if (data?.status == "Success") {
                setData(data?.donors);
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
                <h2 className='text-center mb-3'>Donor List</h2>
                <table className="table">
                    <thead>
                        <tr className='table-head-row'>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">{(item.name || item.hospitalName || item.organisationName) + ` (${item.role})`}</th>
                                    <td scope="row">{item.email}</td>
                                    <td scope="row">{item.address}</td>
                                    <td scope="row">{item.phone}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Donor