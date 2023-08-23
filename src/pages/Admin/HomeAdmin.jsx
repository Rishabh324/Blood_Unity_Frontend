import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout';
import moment from 'moment';
import Spinner from '../../components/common/Spinner';
import API from '../../services/API';

const HomeAdmin = () => {
  const { loading, user } = useSelector(state => state.auth);
  const [data, setData] = useState([]);

  const getAllData = async () => {
    try {
      const { data } = await API.get('/admin');
      if (data?.status === "success") {
        setData(data?.inventory);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Layout>
      <div className='container'>
        <div className='flex-column'>
          {
            loading ? (
              <Spinner />
            ) : (
              <div className='home container'>
                <h1>Welcome Admin, <i className='text-success'>{user?.name}</i></h1>
                <h3>Manage Blood Bank App</h3>
                <hr />
                <h2>Recent Transactions</h2>
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
        </div>
      </div>
    </Layout>
  )
}

export default HomeAdmin