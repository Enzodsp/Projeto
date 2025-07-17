import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';  // Importe do pacote correto
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  providers: [
    provideServerRendering()  // Remova withRoutes() se não estiver usando
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}