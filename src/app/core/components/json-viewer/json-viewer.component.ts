import { Component, Input } from '@angular/core';
import { FakeData } from '../../interfaces/fake-data.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent {

  @Input() fake!: FakeData;

  isCopying = false;

  constructor(
    private toast: ToastService
  ) {}

  async copy() {
    try {
      this.isCopying = true;
      await navigator.clipboard.writeText(JSON.stringify(this.fake.data, undefined, 2));
      this.toast.success('Success', 'JSON copy to clipboard');
    } catch (error) {
      this.toast.showError('Error', 'Something went wrong to copy json');
    } finally { 
      this.isCopying = false;
    }
  }

}
