import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileInfo} from '../../apis/ng-tapis-files-client';
import {TSystem} from '../../apis/ng-tapis-systems-client';

@Component({
  selector: 'app-modal-preview',
  templateUrl: './modal-preview.component.html',
  styleUrls: ['./modal-preview.component.scss']
})
export class ModalPreviewComponent implements OnInit {

  @Input() file: FileInfo;
  @Input() system: TSystem;
  public sourceURI: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.sourceURI = `https://dev.develop.tapis.io/v3/files/content/${this.system.name}/${this.file.path}`;
  }

}
