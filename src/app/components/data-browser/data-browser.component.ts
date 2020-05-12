import { Component, OnInit } from '@angular/core';
import {FileOperationsService} from '../../apis/ng-tapis-files-client/api/fileOperations.service';
import {SystemsService, TSystem} from '../../apis/ng-tapis-systems-client';
import {FileInfo} from '../../apis/ng-tapis-files-client';
import {Observable, ReplaySubject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPreviewComponent} from '../modal-preview/modal-preview.component';

@Component({
  selector: 'app-data-browser',
  templateUrl: './data-browser.component.html',
  styleUrls: ['./data-browser.component.scss']
})
export class DataBrowserComponent implements OnInit {

  constructor(private fileOpsService: FileOperationsService,
              private systemsService: SystemsService,
              private modalService: NgbModal) {}

  private listing: ReplaySubject<Array<FileInfo>> = new ReplaySubject<Array<FileInfo>>(1);
  public readonly listing$: Observable<Array<FileInfo>> = this.listing.asObservable();
  private activeSystemSubject: ReplaySubject<TSystem> = new ReplaySubject<TSystem>(1);
  public readonly activeSystem$: Observable<TSystem> = this.activeSystemSubject.asObservable();
  public activeSystem: TSystem;
  private systemsListing: ReplaySubject<Array<TSystem>> = new ReplaySubject<Array<TSystem>>(1);
  public readonly systemsListing$: Observable<Array<TSystem>> = this.systemsListing.asObservable();



  ngOnInit(): void {
    this.systemsService.getSystems()
      .subscribe( (resp) => {
        const systems = resp.result.filter( (s) => !s.jobCanExec);
        this.systemsListing.next(systems);
        this.activeSystemSubject.next(systems[0]);
    }, (error) => {
      console.log(error);
    });


    this.activeSystem$.subscribe( (next) => {
      this.activeSystem = next;
      this.browseFolder('/');
    });
  }

  selectSystem(sys: TSystem) {
    this.activeSystemSubject.next(sys);
  }

  browseFolder(path: string) {
    console.log(this.activeSystem, path);
    this.fileOpsService.listFiles(this.activeSystem.name, path).subscribe( (resp) => {
      this.listing.next(resp.result);
    }, (error) => {
      console.log(error);
    });
  }

  preview(fileItem: FileInfo): void {
    const modalRef = this.modalService.open(ModalPreviewComponent);
    modalRef.componentInstance.file = fileItem;
    modalRef.componentInstance.system = this.activeSystem;
  }


}
