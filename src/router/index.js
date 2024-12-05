import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/components/views/Login.vue";
import RoomInfoManagement from '@/components/views/RoomInfoManagement.vue';
import SideNav from '@/components/EmployeeSideNav.vue';
import EmployChekIn from "@/components/views/EmployChekIn.vue";
import UserManagement from '@/components/views/UserLayout.vue'; // 假设你已经创建了UserManagement组件

const routes = [
    // 默认路由跳转到登录页
    { path: '/', redirect: '/login' },

    // 登录页路由
    { path: '/login', component: Login },

    // 父路由 '/employee' 和子路由配置
    {
        path: '/employee',
        component: () => import('@/components/views/EmployeeLayout.vue'), // 你可以创建一个 EmployeeLayout.vue 作为父组件
        children: [
            {
                path: '',
                redirect: '/employee/roominfo' // 默认跳转到 roominfo 页面
            },
            {
                path: 'roominfo',
                component: RoomInfoManagement, // 房间信息管理页面
            },
            {
                path: 'side',
                component: SideNav, // 侧边导航栏组件
            },
            {
                path:'employeecheckin',
                component: EmployChekIn,
            }
        ]
    },

    // 用户管理路由
    {
        path: '/user',
        component: UserManagement, // 用户管理页面
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
