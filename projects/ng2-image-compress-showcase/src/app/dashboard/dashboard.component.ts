import {Component} from '@angular/core';
import {ImageCompressService} from '../../../../ng2-image-compress/src/lib/ng2-image-compress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private im: ImageCompressService) {
  }

  addFile($event) {
    const files = $event.target.files;
    console.log(files);
    this.im.compressImageList(files).subscribe(
      values => {
        console.log(values);
      }
    );
  }
}
