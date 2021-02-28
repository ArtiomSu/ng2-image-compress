import {NgImage, NgSourceImage} from './image-model';
import {from, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ImageUtilityService {

  public createImage(url): Observable<Event> {
    const image = new Image();
    const imagePromise = new Promise<Event>(resolve => image.onload = resolve);
    image.src = url;
    return from(imagePromise);
  }

  public filesToSourceImages(fileList: FileList): Observable<NgImage> {
    return this.filesArrayToSourceImages(Array.from(fileList));
  }

  private fileToURL(file: File): Observable<ProgressEvent<FileReader>> {
    const reader = new FileReader();
    const readerPromise = new Promise<ProgressEvent<FileReader>>(resolve => reader.onload = resolve);
    reader.readAsDataURL(file);
    return from(readerPromise);
  }

  public filesArrayToSourceImages(fileList: File[]): Observable<NgImage> {
    return from(fileList)
      .pipe(
        mergeMap(f => {
          const imageResult: NgImage = new NgSourceImage();
          imageResult.fileName = f.name;
          imageResult.type = f.type;
          imageResult.imageObjectUrl = URL.createObjectURL(f);
          return this.fileToURL(f)
            .pipe(
              map(result => {
                imageResult.imageObjectUrl = result.target.result;
                return imageResult;
              })
            );
        })
      );
  }
}

