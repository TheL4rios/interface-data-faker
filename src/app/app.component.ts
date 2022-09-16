import { Component, OnInit } from '@angular/core';
import { CodeAnalyzerService } from './core/services/code-analyzer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  editorOptions = {
    theme: 'vs-dark', 
    language: 'typescript'
  };

  code = '';

  constructor(
    private codeAnalyzerService: CodeAnalyzerService
  ) {}

  ngOnInit(): void {
    this.code = this.codeAnalyzerService.getInitialCode();
  }

  onGenerateData() {
    const interfaces = this.codeAnalyzerService.analyzeCode(this.code);
    console.log(interfaces);
    
  }
}
