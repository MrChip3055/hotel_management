import axios from 'axios';

// 设置基础URL
const API_URL = 'http://10.85.21.73:12417';

// 创建 axios 实例
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 登录接口
export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        localStorage.setItem('token', response.headers.get('Authorization'));
        localStorage.setItem('id', response.headers.get('id'));
        localStorage.setItem('role', response.headers.get('role'));
        console.log(localStorage.getItem('token'));
        console.log(response.headers)
        return response;
    } catch (error) {
        throw error.response || '网络错误，请稍后重试';
    }
};

// 注册接口
export const register = async (username, password, role) => {
    try {
        const response = await api.post('/auth/register', { username, password, role });
        localStorage.setItem('token', response.headers.get('Authorization'));
        return response.data;
    } catch (error) {
        throw error.response?.data || '网络错误，请稍后重试';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
}
