import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) return alert("Provide All Fields.");
        store.dispatch(userLogin({ role, email, password }));
    }
    catch (err) {
        console.log(err);
    }
};

export const handleRegister = (e, name, role, email, password, organisation, hospital, website, address, phone) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({ e, name, role, email, password, organisation, hospital, website, address, phone }));
    }
    catch (err) {
        console.log(err);
    }
};