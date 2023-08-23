import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import moment from 'moment'
import API from "../../services/API"
import { useSelector } from 'react-redux'

const Organisation = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector(state => state.auth);

  const getOrganisation = async () => {
    try {
      if (user?.role === "Donor") {
        const { data } = await API.get('/inventory/getOrganisationRecords')
        if (data?.status == "Success") {
          setData(data?.organisations);
        }
      }
      if (user?.role === "Hospital") {
        const { data } = await API.get('/inventory/getOrganisationRecordsHospital')
        if (data?.status == "Success") {
          setData(data?.organisations);
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOrganisation();
  }, [user]);
  return (
    <Layout>
      <div className='container mt-4'>
        <h2 className='text-center mb-3'>User Associated Organisation</h2>
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
              data?.filter(it => it.role === "Organisation" || it.role === "Hospital").map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.name || item.hospitalName || item.organisationName}</th>
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
  )
}

export default Organisation