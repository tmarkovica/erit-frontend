import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './modules/index/index.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full'  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
