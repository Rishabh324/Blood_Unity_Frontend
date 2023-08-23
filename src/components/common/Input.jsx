import React from 'react'

const Input = ({ type, labelName, name, value, onChange }) => {
    return (
        <div className="mb-1">
            <label htmlFor={name} className="form-label">{labelName}</label>
            <input type={type} className="form-control" id={name} name={name} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;