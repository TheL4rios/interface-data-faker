import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataError } from './core/interfaces/error.interface';
import { FakeData } from './core/interfaces/fake-data.interface';
import { CodeAnalyzerService } from './core/services/code-analyzer.service';
import { FakeDataService } from './core/services/fake-data.service';
import { ToastService } from './core/services/toast.service';

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

  form!: FormGroup;

  minLimitArray = 1;
  maxLimitArray = 100;

  isLoading = false;

  constructor(
    private codeAnalyzerService: CodeAnalyzerService,
    private fakeDataService: FakeDataService,
    private toast: ToastService
  ) {
    this.form = new FormGroup({
      limitArray: new FormControl(5, [Validators.required, Validators.min(this.minLimitArray), Validators.max(this.maxLimitArray)])
    });
  }

  ngOnInit(): void {
    this.code = this.codeAnalyzerService.getInitialCode();
  }

  onGenerateData() {
    this.fakeData = [];

    if (!this.code) {
      this.toast.showError('Error', 'Code required!');
      return;
    }

    if (this.form.invalid) {
      this.toast.showError(
        'Error', 
        this.form.get('limitArray')?.hasError('min') ? `Minimum limit array is ${ this.minLimitArray }.` : `Maximum limit array is ${ this.maxLimitArray }.`
      );
      return;
    }

    const limitArray = this.form.get('limitArray')?.value;

    if (isNaN(limitArray)) {
      this.toast.showError('Error', 'Limit array must be a number');
      return;
    }

    this.isLoading = true;

    const interfaces = this.codeAnalyzerService.analyzeCode(this.code);

    if (!interfaces.length) {
      this.toast.showError('Error', 'Interfaces not found');
      this.isLoading = false;
      return;
    }
    
    try {
      this.fakeData = this.fakeDataService.getFakeData(interfaces, limitArray);
    } catch (error) {
      this.toast.showError('Error', (error as DataError).message);
    } finally {
      this.isLoading = false;
    }
  }
}
