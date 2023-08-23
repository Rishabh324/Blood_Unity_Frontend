import React, { useState } from 'react';
import Input from '../components/common/Input';
import API from '../services/API';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Modal = () => {
    const [inventoryType, setInventoryType] = useState("IN");
    const [bloodGroup, setBloodGroup] = useState("");
    const [quantity, setQuantity] = useState("");
    const [email, setEmail] = useState("");

    const { user } = useSelector(state => state.auth);

    const handleSubmit = async () => {
        try {
            if (!bloodGroup || !quantity) {
                return alert("Please fill all the fields");
            }

            const { data } = await API.post(
                '/inventory/add-inventory', {
                email,
                organisation: user?._id,
                inventoryType,
                bloodGroup,
                quantity
            });

            if (data?.status == "Success") {
                window.location.reload();
                toast.success("New Record Created");
            }
        }
        catch (err) {
            window.location.reload();
            alert(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Blood Record</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className='d-flex'>
                            Blood Type: &nbsp;
                            <div className='form-check ms-3'>
                                <input type='radio' value="IN" name='in' onChange={(e) => setInventoryType(e.target.value)} className='form-check-input' defaultChecked />
                                <label className='form-check-label' htmlFor='in'>In</label>
                            </div>
                            <div className='form-check-label ms-3'>
                                <input type='radio' value="OUT" name='in' onChange={(e) => setInventoryType(e.target.value)} className='form-check-input' />
                                <label className='form-check-label' htmlFor='in'>Out</label>
                            </div>
                        </div>
                        <select className="form-select mt-3 mb-2" aria-label="Default select example"
                            onChange={(e) => { setBloodGroup(e.target.value) }} >
                            <option defaultValue>Select Blood Group</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <Input
                            labelName="Donar Email"
                            type="email"
                            name="donorEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            labelName="Quantity (in ml)"
                            type="number"
                            name="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal