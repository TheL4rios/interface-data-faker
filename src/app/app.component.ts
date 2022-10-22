import { Component, OnInit } from '@angular/core';
import { FakeData } from './core/interfaces/fake-data.interface';
import { CodeAnalyzerService } from './core/services/code-analyzer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
  };

  code = '';

  fakeData: FakeData[] = [];

  constructor(
    private codeAnalyzerService: CodeAnalyzerService,
  ) { }

  ngOnInit(): void {
    this.code = this.codeAnalyzerService.getInitialCode();
  }

  onChangeData(fakeData: FakeData[]) {
    this.fakeData = fakeData;
  }
}
