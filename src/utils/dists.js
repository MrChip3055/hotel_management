import {listRoomType} from "@/services/room.js";
import {IconLocalHospital} from "@mdui/icons/local-hospital.js";

export const roomTypeD = () => {
    const typeDist = {
        'big': '大床房',
        'subig': '高级大床房',
        'res': '总统套房',
    }
    listRoomType().then(r => {
        for(const t of r.data){
            typeDist[t.name] = t.fullName
        }
    }).catch(e => {
        console.log(e)
    })
    // console.log(typeDist)
    return typeDist

}

export const roomStatusD = {
    'AVAILABLE': '空房',
    'BOOKED': '已预定',
    'OCCUPIED': '已入住',
    'CLOSED': '关闭',
    'DELETED': '已删除',
}