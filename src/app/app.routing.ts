import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
];

export const AppRouting = RouterModule.forRoot(APP_ROUTES);
