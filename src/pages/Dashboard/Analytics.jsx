import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import API from '../../services/API'
import moment from 'moment';

const Analytics = () => {
  const [grps, setGrps] = useState([]);
  const [recent, setRecent] = useState([]);
  const colors = ["#B799FF", "#F2921D", "#B0DAFF", "#FEBBCC", "#B4E4FF", "#64CCC5", "#F4D160", "#35A29F"];

  const getRecentInventory = async () => {
    try {
      const { data } = await API.get('/inventory/getRecentInventory');
      if (data?.status === "success") {
        setRecent(data?.inventory);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const bloodGrpData = async () => {
    try {
      const { data } = await API.get('/analytics/bloodData');
      if (data?.status === "success") {
        setGrps(data?.bloodData);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    bloodGrpData();
    getRecentInventory();
  }, []);

  return (
    <div>
      <Header />
      <div className='d-flex flex-row flex-wrap mt-4 mx-2 justify-content-center'>
        {
          grps?.map((item, index) => (
            <div key={index} className="card m-2" style={{ width: '20rem', backgroundColor: `${colors[index]}`, borderRadius: "35px 35px 35px 35px" }}>
              <div className="card-body">
                <h3 className="card-title text-dark bg-light text-center p-2" style={{ borderRadius: "20px 20px 0 0" }}>{item.bloodGroup}</h3>
                <div className='text-center'>
                  <p className="card-text" style={{ fontSize: "1.1rem" }}>Total In: <b>{item.totalIn} ml</b></p>
                  <p className="card-text" style={{ fontSize: "1.1rem" }}>Total Out: <b>{item.totalOut} ml</b></p>
                </div>
              </div>
              <div className='card-footer text-light bg-dark text-center m-3' style={{ borderRadius: "0 0 20px 20px" }}>
                <p style={{ fontSize: "1.1rem", }}>Total Available Blood: <b>{item.bloodAvailable} ml</b></p>
              </div>
            </div>
          ))
        }
      </div>
      <div className='container'>
        <p className='mt-3' style={{ fontSize: "2.7rem" }}>Recent Transactions</p>
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
              recent?.map((item) => (
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
    </div>
  )
}

export default Analytics;