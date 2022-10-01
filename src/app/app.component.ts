import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataError } from './core/interfaces/error.interface';
import { FakeData } from './core/interfaces/fake-data.interface';
import { CodeAnalyzerService } from './core/services/code-analyzer.service';
import { FakeDataService } from './core/services/fake-data.service';
import { NgToastService } from 'ng-angular-popup';

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

  showAlert = false;
  title = '';

  fakeData: FakeData[] = [];

  form!: FormGroup;

  minLimitArray = 1;
  maxLimitArray = 100;

  isLoading = false;

  constructor(
    private codeAnalyzerService: CodeAnalyzerService,
    private fakeDataService: FakeDataService,
    private toast: NgToastService
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
    this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000});

    if (this.form.invalid) {
      this.title = this.form.get('limitArray')?.hasError('min') ? `Minimum limit array is ${ this.minLimitArray }.` : `Maximum limit array is ${ this.maxLimitArray }.`;
      this.showAlert = true;
      return;
    }

    if (isNaN(this.form.get('limitArray')?.value)) {
      this.title = 'Limit array must be a number';
      this.showAlert = true;
      return;
    }

    if (!this.code) {
      this.title = 'Code required!';
      this.showAlert = true;
      return;
    }

    this.isLoading = true;

    const interfaces = this.codeAnalyzerService.analyzeCode(this.code);

    if (!interfaces.length) {
      this.title = 'Interfaces not found';
      this.showAlert = true;
      return;
    }

    this.showAlert = false;
    
    try {
      this.fakeData = this.fakeDataService.getFakeData(interfaces);
    } catch (error) {
      this.title = (error as DataError).message;
      this.showAlert = true;
    } finally {
      this.isLoading = false;
    }
  }
}
