import {axiosWithAuth} from "@/services/axiosWithAuth.js";

export const resetPass = async (id) => {
    try{
        return await axiosWithAuth.post(`/admin/reset/${id}`)
    }catch (e) {
        throw e.response || null
    }
}

export const deleteEmployee = async (id) => {
    try{
        return await axiosWithAuth.delete(`/admin/${id}`)
    }catch (e) {
        throw e.response || null
    }
}

export const listEmployee = async () => {
    try{
        return await axiosWithAuth.get('/admin/list')
    } catch (e) {
        throw e.response || null
    }
}

export const getRole = () => {
    return localStorage.getItem('role')
}
export const getId = () => {
    return  localStorage.getItem('id')
}
export const getToken = () => {
    return localStorage.getItem('token')
}