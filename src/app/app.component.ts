import { Component, OnInit } from '@angular/core';
import { FakeData } from './core/interfaces/fake-data.interface';
import { CodeAnalyzerService } from './core/services/code-analyzer.service';
import { FakeDataService } from './core/services/fake-data.service';

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

  showAlert = false;
  title = '';

  fakeData: FakeData[] = [];

  constructor(
    private codeAnalyzerService: CodeAnalyzerService,
    private fakeDataService: FakeDataService,
  ) {}

  ngOnInit(): void {
    this.code = this.codeAnalyzerService.getInitialCode();
  }

  onGenerateData() {

    if (!this.code) {
      this.title = 'Code required!';
      this.showAlert = true;
      return;
    }

    const interfaces = this.codeAnalyzerService.analyzeCode(this.code);

    if (!interfaces.length) {
      this.title = 'Interfaces not found';
      this.showAlert = true;
      return;
    }

    this.showAlert = false;
    this.fakeData = this.fakeDataService.getFakeData(interfaces);
  }
}
