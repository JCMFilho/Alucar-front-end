import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  MicrosoftLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { BlockUIModule } from 'ng-block-ui';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdicionarEditarVeiculoComponent } from './components/adicionar-editar-veiculo/adicionar-editar-veiculo.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DetalhesVeiculoComponent } from './components/detalhes-veiculo/detalhes-veiculo.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { UserDetailAdminComponent } from './components/user-detail-admin/user-detail-admin.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HttpInterceptorImpl } from './components/util/http.interceptor';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { SafePipe } from './safe.pipe';
import { AuthService } from './service/auth.service';
import { LoadingService } from './service/loading.service';
import { VehicleService } from './service/vehicle.service';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
registerLocaleData(ptBr);
const jwtOpt: JwtModuleOptions = { config: { tokenGetter: getToken } };
export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

export function getToken() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CardListComponent,
    ProgressBarComponent,
    SafePipe,
    UserDetailComponent,
    UserDetailAdminComponent,
    VeiculosComponent,
    AdicionarEditarVeiculoComponent,
    ConfirmDialogComponent,
    RegistrarUsuarioComponent,
    DetalhesVeiculoComponent,
    RecuperarSenhaComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatProgressBarModule,
    JwtModule.forRoot(jwtOpt),
    BlockUIModule.forRoot({
      message: 'Carregando...',
    }),
    NgxMaskModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    VehicleService,
    LoadingService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorImpl,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '427927453603-trt4sr2acrbh8kko010rpc93cqus7bpe.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1280094922831150'),
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider(
              '46fcbf93-2df1-4623-8ef1-754d587b7445'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
