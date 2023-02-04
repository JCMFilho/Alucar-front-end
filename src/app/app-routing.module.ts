import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { UserDetailAdminComponent } from './components/user-detail-admin/user-detail-admin.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { AuthGuard } from './guard/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: IndexComponent },
  { path: 'registrar', component: RegistrarUsuarioComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  {
    path: 'cliente',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissaoEsperada: 'ROLE_CLIENT',
    },
  },
  {
    path: 'admin',
    component: UserDetailAdminComponent,
    canActivate: [AuthGuard],
    data: {
      permissaoEsperada: 'ROLE_ADMIN',
    },
  },
  {
    path: 'veiculos',
    component: VeiculosComponent,
    canActivate: [AuthGuard],
    data: {
      permissaoEsperada: 'ROLE_ADMIN',
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
