import { SourceImage } from './compressimage';
import { Observable } from 'rxjs';
export class ImageUtilityService {
    static createImage(url, callback) {
        const image = new Image();
        image.onload = () => {
            callback(image);
        };
        image.src = url;
    }
    static fileToDataURL(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
    static filesToSourceImages(fileList) {
        return Observable.create((observer) => {
            let total = fileList.length;
            Array.from(fileList).forEach(fileItem => {
                const imageResult = new SourceImage();
                console.log(fileItem.name);
                imageResult.fileName = fileItem.name;
                imageResult.type = fileItem.type;
                imageResult.imageObjectUrl = URL.createObjectURL(fileItem);
                ImageUtilityService.fileToDataURL(fileItem).then((result) => {
                    imageResult.imageDataUrl = result;
                    observer.next(imageResult);
                    if (--total === 0) {
                        observer.complete();
                    }
                });
            });
        });
    }
    static filesArrayToSourceImages(fileList) {
        return Observable.create((observer) => {
            let total = fileList.length;
            fileList.forEach(fileItem => {
                const imageResult = new SourceImage();
                console.log(fileItem.name);
                // imageResult.fileName = fileItem.name;
                imageResult.imageObjectUrl = URL.createObjectURL(fileItem);
                ImageUtilityService.fileToDataURL(fileItem).then((result) => {
                    imageResult.imageDataUrl = result;
                    observer.next(imageResult);
                    if (--total === 0) {
                        observer.complete();
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=imageutilityservice.js.map