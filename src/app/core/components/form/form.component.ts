import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FakeDataService } from '../../services/fake-data.service';
import { ToastService } from '../../services/toast.service';
import { DataError } from '../../interfaces/error.interface';
import { CodeAnalyzerService } from '../../services/code-analyzer.service';
import { FakeData } from '../../interfaces/fake-data.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() code: string = '';

  @Output() dataGenerated = new EventEmitter<FakeData[]>();

  form!: FormGroup;

  minLimitArray = 1;
  maxLimitArray = 100;

  isLoading = false;

  constructor(
    private fakeDataService: FakeDataService,
    private toast: ToastService,
    private codeAnalyzerService: CodeAnalyzerService
  ) {
    this.form = new FormGroup({
      limitArray: new FormControl(5, [Validators.required, Validators.min(this.minLimitArray), Validators.max(this.maxLimitArray)])
    });
  }

  onGenerateData() {
    try {
      this.isLoading = true;

      this.dataGenerated.emit([]);

      if (!this.code) {
        this.toast.showError('Error', 'Code required!');
        return;
      }

      if (this.form.invalid) {
        this.toast.showError(
          'Error',
          this.form.get('limitArray')?.hasError('min') ? `Minimum limit array is ${this.minLimitArray}.` : `Maximum limit array is ${this.maxLimitArray}.`
        );
        return;
      }

      const limitArray = this.form.get('limitArray')?.value;

      if (isNaN(limitArray)) {
        this.toast.showError('Error', 'Limit array must be a number');
        return;
      }

      const interfaces = this.codeAnalyzerService.analyzeCode(this.code);

      if (!interfaces.length) {
        this.toast.showError('Error', 'Interfaces not found');
        return;
      }

      const fakeData = this.fakeDataService.getFakeData(interfaces, limitArray);
      this.dataGenerated.emit(fakeData);
    } catch (error) {
      this.toast.showError('Error', (error as DataError).message);
    } finally {
      this.isLoading = false;
    }
  }

}
