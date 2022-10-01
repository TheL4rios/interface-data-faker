import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AlertComponent } from './core/components/alert/alert.component';
import { types } from './core/constant/types';
import { NgToastModule } from 'ng-angular-popup';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: './assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => { 
    const monaco = (<any>window).monaco; 
    monaco.languages.typescript.typescriptDefaults.addExtraLib(types, 'types.ts');
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    NgToastModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
