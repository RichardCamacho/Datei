import { Component, ElementRef } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.scss']
})
export class UploadComponent {

  public readonly fileUploadControl = new FileUploadControl(FileUploadValidators.fileSize(80000)).multiple(false);

  public readonly fileUploadWithTemplate = new FileUploadControl();

  public readonly filesControl = new FormControl(null, FileUploadValidators.accept(['video/*', 'image/*', '.mp3']));

  public readonly demoForm = new FormGroup({
    files: this.filesControl
  });

  public readonly customFileUploadControl = new FileUploadControl().setListVisibility(false);

  public animation = false;
  public multiple = false;
  public uploadedFiles = [];
  public isDisabled = false;
  public acceptFiles = 'image/*';

  constructor(private elRef: ElementRef) {
  }



  public toggleStatus(): void {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

  public toggleStandAloneStatus(): void {
    this.fileUploadControl.disable(!this.fileUploadControl.disabled);
  }

  public toggleListVisibility(): void {
    this.fileUploadControl.setListVisibility(!this.fileUploadControl.isListVisible);
  }

  public toggleMultiple(): void {
    this.fileUploadControl.multiple(!this.fileUploadControl.isMultiple);
  }

  public toggleReactiveMultiple(): void {
    this.multiple = !this.multiple;
  }

  public clearReactive(): void {
    this.filesControl.setValue([]);
  }

  public clearTemplateDriven(): void {
    this.uploadedFiles = [];
  }

  public clearStandAlone(): void {
    this.fileUploadControl.clear();
  }
}
