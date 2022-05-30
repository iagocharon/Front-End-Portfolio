import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    IndexComponent,
    MenuComponent,
    ExperienciasComponent,
    AcercaComponent,
    EstudiosComponent,
    HardSkillsComponent,
    SoftSkillsComponent,
    FooterComponent,
    ProyectosComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
