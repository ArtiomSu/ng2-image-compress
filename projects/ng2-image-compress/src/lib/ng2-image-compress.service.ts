import {Injectable} from '@angular/core';
import {NgImage} from './image-model';
import {ImageUtilityService} from './image-utility.service';
import {from, Observable} from 'rxjs';
import {ResizeOptions} from './resize-options';
import {map, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressService {

  constructor(private imageUtilityService: ImageUtilityService) {}

  private compressImageObject(sourceImgObj, options: ResizeOptions): string {
    const outputFormat = options.Resize_Type;
    const quality = options.Resize_Quality || 50;
    let mimeType = 'image/jpeg';
    if (outputFormat !== undefined && outputFormat === 'png') {
      mimeType = 'image/png';
    }
    const maxHeight = options.Resize_Max_Height || 300;
    const maxWidth = options.Resize_Max_Width || 250;
    let height = sourceImgObj.height;
    let width = sourceImgObj.width;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round(height *= maxWidth / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round(width *= maxHeight / height);
        height = maxHeight;
      }
    }

    const cvs = document.createElement('canvas');
    cvs.width = width;
    cvs.height = height;
    const ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
    const newImageData = cvs.toDataURL(mimeType, quality / 100);
    const resultImageObj = new Image();
    resultImageObj.src = newImageData;
    return resultImageObj.src;
  }


  /**
   * compressImage returns an observable of the original image with compressed image
   * set on NgImage.compressedImage
   *
   * @param sourceImage the source image to compress
   * @param options object that describes the resize options
   * */
  public compressImage(sourceImage: NgImage, options: ResizeOptions): Observable<NgImage> {
    return this.imageUtilityService.createImage(sourceImage.imageObjectUrl)
      .pipe(
        map(ev => this.compressImageObject(ev, options)),
        map(compressed => {
          sourceImage.compressedImage = {
            fileName: sourceImage.fileName,
            imageObjectUrl: '',
            imageDataUrl: compressed,
            type: compressed.match(/:(.+\/.+);/)[1],
            compressedImage: undefined
          };
          return sourceImage;
        })
      );
  }

  public compressImageList(fileList: FileList, option?: ResizeOptions): Observable<NgImage> {
    if (option === undefined) {
      option = new ResizeOptions();
    }
    return this.imageUtilityService.filesToSourceImages(fileList)
      .pipe(
        mergeMap(source => this.compressImage(source, option))
      );
  }


  public compressImageArray(fileList: File[], option?: ResizeOptions): Observable<NgImage> {
    if (option === undefined) {
      option = new ResizeOptions();
    }
    return this.imageUtilityService.filesArrayToSourceImages(fileList)
      .pipe(
        mergeMap(source => this.compressImage(source, option))
      );
  }

  public compressNgImages(images: NgImage[], option?: ResizeOptions): Observable<NgImage> {
    if (option === undefined) {
      option = new ResizeOptions();
    }
    return from(images)
      .pipe(
        mergeMap(img => this.compressImage(img, option))
      );
  }

}

