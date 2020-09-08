import React, { lazy } from 'react'
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))
const ListComponent = lazy(() => import('../components/list/ListComponent'))
const MonitoringComponent = lazy(() =>
    import('../components/monitoring/MonitoringComponent'),
)
const routes = [
    {
        path: '/MonitoringComponent',
        component: MonitoringComponent,
        isMenu: true,
        icon: 'DesktopOutlined',
        title: 'title.main.monitoring',
    },
    {
        path: '/ListComponent',
        component: ListComponent,
        isMenu: true,
        icon: 'MenuUnfoldOutlined',
        title: 'title.main.list',
    },
    {
        path: '/Dashboard',
        component: Dashboard,
        isMenu: true,
        icon: 'DesktopOutlined',
        title: 'title.main.dashboard',
    },
    {
        path: '/MonitoringComponent/:id',
        component: MonitoringComponent,
        isMenu: false,
        icon: 'DesktopOutlined',
        title: 'title.main.monitoring',
    },
]

export default routes
