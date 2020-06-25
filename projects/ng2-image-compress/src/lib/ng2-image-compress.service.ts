import {Injectable} from '@angular/core';
import {IImage} from './compressimage';
import {ImageUtilityService} from './imageutilityservice';
import {from as Observablefrom, Observable} from 'rxjs';
import {ResizeOptions} from './resizeoptions';

@Injectable({
  providedIn: 'root'
})

export class ImageCompressService {


  private static jicCompress(sourceImgObj, options: ResizeOptions) {
    const outputFormat = options.Resize_Type;
    const quality = options.Resize_Quality || 50;
    let mimeType = 'image/jpeg';
    if (outputFormat !== undefined && outputFormat === 'png') {
      mimeType = 'image/png';
    }


    const maxHeight = options.Resize_Max_Height || 300;
    const maxWidth = options.Resize_Max_Width || 250;

    console.log('MAX Width n Height');
    console.log(options.Resize_Max_Height);
    console.log(options.Resize_Max_Width);
    console.log('Quality');
    console.log(quality);

    let height = sourceImgObj.height;
    let width = sourceImgObj.width;

    // calculate the width and height, constraining the proportions
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
    console.log('CVS Width n Height');
    console.log(width);
    console.log(height);
    console.log('Quality');
    console.log(quality);

    const cvs = document.createElement('canvas');
    cvs.width = width;
    cvs.height = height;
    const ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
    const newImageData = cvs.toDataURL(mimeType, quality / 100);
    const resultImageObj = new Image();
    resultImageObj.src = newImageData;
    return resultImageObj.src;
  }


  public static compressImage(sourceImage: IImage, options: ResizeOptions, callback) {
    const that = this;
    ImageUtilityService.createImage(sourceImage.imageDataUrl, function (image) {
      const dataURLcompressed = that.jicCompress(image, options);
      sourceImage.compressedImage = {
        fileName: sourceImage.fileName,
        imageObjectUrl: '',
        imageDataUrl: dataURLcompressed,
        type: dataURLcompressed.match(/:(.+\/.+);/)[1],
        compressedImage: null
      };
      callback(sourceImage);
    });
  }

  public static filesToCompressedImageSourceEx(fileList: FileList, option: ResizeOptions): Promise<Observable<IImage>> {

    return new Promise<Observable<IImage>>((resolve, reject) => {
      let count = fileList.length;
      const observer = ImageUtilityService.filesToSourceImages(fileList);
      const images: Array<IImage> = [];
      observer.subscribe((image) => {
        images.push(image);
        if (option == null) {
          option = new ResizeOptions();
        }
        ImageCompressService.compressImage(image, option, (imageRef) => {
          if (--count === 0) {
            resolve(Observablefrom(images));
          }
        });
      }, (error) => {
        reject('Error while compressing images');
      });
    });
  }

  public static filesToCompressedImageSource(fileList: FileList): Promise<Observable<IImage>> {


    return new Promise<Observable<IImage>>((resolve, reject) => {
      let count = fileList.length;
      const observer = ImageUtilityService.filesToSourceImages(fileList);
      const images: Array<IImage> = [];
      observer.subscribe((image) => {
        images.push(image);

        ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
          if (--count === 0) {
            resolve(Observablefrom(images));
          }
        });
      }, (error) => {
        reject('Error while compressing images');
      });
    });
  }

  public static filesArrayToCompressedImageSourceEx(fileList: File[], option: ResizeOptions): Promise<Observable<IImage>> {

    return new Promise<Observable<IImage>>((resolve, reject) => {
      let count = fileList.length;
      const observer = ImageUtilityService.filesArrayToSourceImages(fileList);
      const images: Array<IImage> = [];
      observer.subscribe((image) => {
        images.push(image);
        if (option == null) {
          option = new ResizeOptions();
        }
        ImageCompressService.compressImage(image, option, (imageRef) => {
          if (--count === 0) {
            resolve(Observablefrom(images));
          }
        });
      }, (error) => {
        reject('Error while compressing images');
      });
    });
  }

  public static filesArrayToCompressedImageSource(fileList: File[]): Promise<Observable<IImage>> {

    return new Promise<Observable<IImage>>((resolve, reject) => {
      let count = fileList.length;
      const observer = ImageUtilityService.filesArrayToSourceImages(fileList);
      const images: Array<IImage> = [];
      observer.subscribe((image) => {
        images.push(image);
        ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
          if (--count === 0) {
            resolve(Observablefrom(images));
          }
        });
      }, (error) => {
        reject('Error while compressing images');
      });
    });
  }

  public static IImageListToCompressedImageSource(images: IImage[]): Promise<IImage[]> {

    return new Promise<IImage[]>((resolve, reject) => {
      let count = images.length;
      images.forEach(image => {
        ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
          console.log(image);
          if (--count === 0) {
            resolve(images);
          }
        });
      });

    });
  }

  public static IImageListToCompressedImageSourceEx(images: IImage[], resizeOption: ResizeOptions): Promise<IImage[]> {
    return new Promise<IImage[]>((resolve, reject) => {
      let count = images.length;
      images.forEach(image => {
        if (resizeOption == null) {
          resizeOption = new ResizeOptions();
        }
        ImageCompressService.compressImage(image, resizeOption, (imageRef) => {
          console.log(image);
          if (--count === 0) {
            resolve(images);
          }
        });
      });

    });
  }

}

