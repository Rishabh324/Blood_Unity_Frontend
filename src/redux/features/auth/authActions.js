import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role: role, email: email, password: password });
            //store token
            console.log(data);
            if (data.status == "Success") {
                localStorage.setItem('token', data.token);
                window.location.replace('/');
                toast.success(data.message);
            }

            return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const userRegister = createAsyncThunk(
    "auth/register",
    async ({ e, name, role, email, password, organisation, hospital, website, address, phone }, { rejectWithValue }) => {
        try {
            e.preventDefault();
            const { data } = await API.post('/auth/register', { name, role, email, password, organisationName: organisation, hospitalName: hospital, website, address, phone });
            if (data.status == "Success") {
                window.location.replace('/login');
                toast.success(data.message);
            }
            return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const currentUser = createAsyncThunk(
    'auth/currentUser',
    async ({ rejectWithValue }) => {
        try {
            const { data } = await API.get('/auth/currentUser');
            if (data) return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)