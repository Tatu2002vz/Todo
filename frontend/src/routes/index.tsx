import path from '../utils/path';
import { Home } from '../pages';
import mainLayout from '../layouts/MainLayout'
import React from 'react'
import OnlyNav from 'layouts/OnlyNav';
import UpdateTask from 'pages/UpdateTask';
import CompleteTask from 'pages/CompleteTask';
import ExpiredTask from 'pages/ExpiredTask';
import ImportantTask from 'pages/ImportantTask';
import ResetPassword from 'pages/ResetPassword';


interface Route {
    pathRoute: string,
    component: React.FC,
    layout: React.FC<{children: React.ReactNode}> | null
}
const publicRoute: Route[]= [
    {pathRoute: path.HOME, component: Home, layout: mainLayout},
    {pathRoute: path.UPDATE_TASK, component: UpdateTask, layout: OnlyNav},
    {pathRoute: path.COMPLETED_TASK, component: CompleteTask, layout: mainLayout},
    {pathRoute: path.EXPIRED_TASK, component: ExpiredTask, layout: mainLayout},
    {pathRoute: path.IMPORTANT_TASK, component: ImportantTask, layout: mainLayout},
    {pathRoute: path.RESET_PASSWORD, component: ResetPassword, layout: null},
]

export default publicRoute