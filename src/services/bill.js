import {axiosWithAuth} from "@/services/axiosWithAuth.js";

export const billList = async () => {
    try{
        return await axiosWithAuth.get('/bill/list')
    }catch (e) {
        throw e.response || null;
    }
}