import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard';
import Employees from '../views/Employees';
import Employee from '../views/Employee';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
  },
  {
    path: '/employee/:id',
    name: 'Employee',
    component: Employee,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
