import { IImage } from './compressimage';
import { Observable } from 'rxjs';
export declare class ImageUtilityService {
    static createImage(url: any, callback: any): void;
    static fileToDataURL(file: any): Promise<any>;
    static filesToSourceImages(fileList: FileList): Observable<IImage>;
    static filesArrayToSourceImages(fileList: File[]): Observable<IImage>;
}
