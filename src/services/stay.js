import {axiosWithAuth} from "@/services/axiosWithAuth.js";

export const checkin = async (data) => {
    try{
        return await axiosWithAuth.post('/stay/check/in', data)
    }catch (e) {
        throw e.response || null;
    }
}

export const checkout = async (data) => {
    try{
        return await axiosWithAuth.post('/stay/check/out', data)
    }catch (e) {
        throw e.response || null;
    }
}

export const bookList = async () => {
    try{
        return await axiosWithAuth.get(`/stay/book/list`)
    }catch (e){
        throw e.response || null;
    }
}

export const bookCheckin = async (id, data) => {
    try{
        return await axiosWithAuth.post(`/stay/book/${id}/in`, data)
    }catch (e){
        throw e.response || null;
    }
}

export const bookRoom = async (data) => {
    try{
        return await axiosWithAuth.post(`/stay/book`, data)
    }catch (e){
        throw e.response || null;
    }
}

export const deleteBook = async (id) => {
    try{
        return await axiosWithAuth.delete(`/stay/book/${id}`)
    }catch (e){
        throw e.response || null;
    }
}