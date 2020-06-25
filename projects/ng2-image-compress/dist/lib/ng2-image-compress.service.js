import * as tslib_1 from "tslib";
var ImageCompressService_1;
import { Injectable } from '@angular/core';
import { ImageUtilityService } from './imageutilityservice';
import { from as Observablefrom } from 'rxjs';
import { ResizeOptions } from './resizeoptions';
let ImageCompressService = ImageCompressService_1 = class ImageCompressService {
    static jicCompress(sourceImgObj, options) {
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
        }
        else {
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
    static compressImage(sourceImage, options, callback) {
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
    static filesToCompressedImageSourceEx(fileList, option) {
        return new Promise((resolve, reject) => {
            let count = fileList.length;
            const observer = ImageUtilityService.filesToSourceImages(fileList);
            const images = [];
            observer.subscribe((image) => {
                images.push(image);
                if (option == null) {
                    option = new ResizeOptions();
                }
                ImageCompressService_1.compressImage(image, option, (imageRef) => {
                    if (--count === 0) {
                        resolve(Observablefrom(images));
                    }
                });
            }, (error) => {
                reject('Error while compressing images');
            });
        });
    }
    static filesToCompressedImageSource(fileList) {
        return new Promise((resolve, reject) => {
            let count = fileList.length;
            const observer = ImageUtilityService.filesToSourceImages(fileList);
            const images = [];
            observer.subscribe((image) => {
                images.push(image);
                ImageCompressService_1.compressImage(image, new ResizeOptions(), (imageRef) => {
                    if (--count === 0) {
                        resolve(Observablefrom(images));
                    }
                });
            }, (error) => {
                reject('Error while compressing images');
            });
        });
    }
    static filesArrayToCompressedImageSourceEx(fileList, option) {
        return new Promise((resolve, reject) => {
            let count = fileList.length;
            const observer = ImageUtilityService.filesArrayToSourceImages(fileList);
            const images = [];
            observer.subscribe((image) => {
                images.push(image);
                if (option == null) {
                    option = new ResizeOptions();
                }
                ImageCompressService_1.compressImage(image, option, (imageRef) => {
                    if (--count === 0) {
                        resolve(Observablefrom(images));
                    }
                });
            }, (error) => {
                reject('Error while compressing images');
            });
        });
    }
    static filesArrayToCompressedImageSource(fileList) {
        return new Promise((resolve, reject) => {
            let count = fileList.length;
            const observer = ImageUtilityService.filesArrayToSourceImages(fileList);
            const images = [];
            observer.subscribe((image) => {
                images.push(image);
                ImageCompressService_1.compressImage(image, new ResizeOptions(), (imageRef) => {
                    if (--count === 0) {
                        resolve(Observablefrom(images));
                    }
                });
            }, (error) => {
                reject('Error while compressing images');
            });
        });
    }
    static IImageListToCompressedImageSource(images) {
        return new Promise((resolve, reject) => {
            let count = images.length;
            images.forEach(image => {
                ImageCompressService_1.compressImage(image, new ResizeOptions(), (imageRef) => {
                    console.log(image);
                    if (--count === 0) {
                        resolve(images);
                    }
                });
            });
        });
    }
    static IImageListToCompressedImageSourceEx(images, resizeOption) {
        return new Promise((resolve, reject) => {
            let count = images.length;
            images.forEach(image => {
                if (resizeOption == null) {
                    resizeOption = new ResizeOptions();
                }
                ImageCompressService_1.compressImage(image, resizeOption, (imageRef) => {
                    console.log(image);
                    if (--count === 0) {
                        resolve(images);
                    }
                });
            });
        });
    }
};
ImageCompressService = ImageCompressService_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ImageCompressService);
export { ImageCompressService };
//# sourceMappingURL=ng2-image-compress.service.js.map