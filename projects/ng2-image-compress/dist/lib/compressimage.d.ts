export interface IImage {
    fileName: string;
    imageObjectUrl: string;
    imageDataUrl: string;
    type: string;
    compressedImage: IImage;
}
export declare class SourceImage implements IImage {
    fileName: string;
    imageObjectUrl: string;
    imageDataUrl: string;
    type: string;
    compressedImage: IImage;
}
