import path from '../utils/path';
import { Home } from '../pages';
import mainLayout from '../layouts/MainLayout'
import React from 'react'
import OnlyNav from 'layouts/OnlyNav';
import UpdateTask from 'pages/UpdateTask';


interface Route {
    pathRoute: string,
    component: React.FC,
    layout: React.FC<{children: React.ReactNode}>
}
const publicRoute: Route[]= [
    {pathRoute: path.HOME, component: Home, layout: mainLayout},
    {pathRoute: path.UPDATE_TASK, component: UpdateTask, layout: OnlyNav}
]

export default publicRoute