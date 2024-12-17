import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/components/views/Login.vue";
import RoomInfoManagement from '@/components/views/RoomInfoManagement.vue';
import SideNav from '@/components/EmployeeSideNav.vue';
import EmployCheckIn from "@/components/views/EmployChekIn.vue";
import EmployBills from "@/components/views/EmployBills.vue";
import Dashboard from "@/components/views/Dashboard.vue";
import AdministratorView from "@/components/views/AdministratorView.vue";
import EmployCheckOut from "@/components/views/EmployCheckOut.vue";

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
                redirect: '/employee/dashboard',
            },
            {
                path: 'roominfo',
                component: RoomInfoManagement, // 房间信息管理页面
            },
            {
                path:'employeecheckin',
                component: EmployCheckIn,
            },
            {
                path:'employeecheckout',
                component: EmployCheckOut,
            },
            {
                path:'employeebills',
                component: EmployBills,
            },
            {
                path:'dashboard',
                component: Dashboard,
            },
            {
                path:'administrator',
                component: AdministratorView,
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
