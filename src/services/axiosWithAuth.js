import axios from "axios";

export const axiosWithAuth = axios.create(
    {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        baseURL: 'http://10.85.21.73:12417/api'
    }
)