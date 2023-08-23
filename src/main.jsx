import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.REACT_APP_BASEURL;
axios.defaults.headers.post["Content-type"] = "application/json";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
