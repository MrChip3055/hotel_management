import {axiosWithAuth} from "@/services/axiosWithAuth.js";

export const newRoom = async (data) => {
    try{
        return await axiosWithAuth.post('/room/create', data)
    }catch (e){
        throw e.response || null
    }
}

export const dropRoom = async (id) => {
    try{
        return await axiosWithAuth.delete(`/room/${id}`)
    }catch (e){
        throw e.response || null
    }
}

export const dropRoomType = async (name) => {
    try{
        return await axiosWithAuth.delete(`/room/type/${name}`)
    }catch (e){
        throw e.response || null
    }
}

export const newRoomType = async (data) => {
    try{
        return await axiosWithAuth.post(`/room/type/create`,data)
    }catch (e){
        throw e.response || null
    }
}

export const listRoom = async () => {
    try{
        return await axiosWithAuth.get('/room/list')
    }catch (e) {
        throw e.response || null
    }
}


export const listRoomType = async () => {
    try{
        return await axiosWithAuth.get('/room/type/list')
    }catch (e) {
        throw e.response || null
    }
}

export const listAvailable = async () => {
    try{
        return await axiosWithAuth.get('/room/available')
    }catch (e) {
        throw e.response || null
    }
}

