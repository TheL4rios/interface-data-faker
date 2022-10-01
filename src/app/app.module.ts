import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { types } from './core/constant/types';
import { NgToastModule } from 'ng-angular-popup';
import { JsonViewerComponent } from './core/components/json-viewer/json-viewer.component';

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
    JsonViewerComponent,
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
