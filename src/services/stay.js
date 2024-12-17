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
