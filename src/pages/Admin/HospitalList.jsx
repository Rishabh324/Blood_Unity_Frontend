import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import API from '../../services/API';

const HospitalList = () => {
  const [hospitalList, setHospitalList] = useState([]);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure you want to delete this donor?", "Sure");
      if (!answer) return
      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      if (data?.status == "success") {
        alert("Hospital deleted successfully");
        window.location.reload();
        getHospitalList();
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getHospitalList = async () => {
    try {
      const { data } = await API.get('/admin/hospital-list');
      console.log(data);
      if (data?.status == "success") {
        setHospitalList(data?.hospitalData);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHospitalList();
  }, [])

  return (
    <Layout>
      <div className='container mt-4'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              hospitalList?.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.hospitalName}</th>
                  <td scope="row">{item.email}</td>
                  <td scope="row">{item.address}</td>
                  <td scope="row">{item.phone}</td>
                  <td scope="row">
                    <div className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default HospitalList