import { IImage } from './compressimage';
import { Observable } from 'rxjs';
import { ResizeOptions } from './resizeoptions';
export declare class ImageCompressService {
    private static jicCompress;
    static compressImage(sourceImage: IImage, options: ResizeOptions, callback: any): void;
    static filesToCompressedImageSourceEx(fileList: FileList, option: ResizeOptions): Promise<Observable<IImage>>;
    static filesToCompressedImageSource(fileList: FileList): Promise<Observable<IImage>>;
    static filesArrayToCompressedImageSourceEx(fileList: File[], option: ResizeOptions): Promise<Observable<IImage>>;
    static filesArrayToCompressedImageSource(fileList: File[]): Promise<Observable<IImage>>;
    static IImageListToCompressedImageSource(images: IImage[]): Promise<IImage[]>;
    static IImageListToCompressedImageSourceEx(images: IImage[], resizeOption: ResizeOptions): Promise<IImage[]>;
}
