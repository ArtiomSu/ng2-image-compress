export interface IImage {
  fileName: string;
  imageObjectUrl: string;
  imageDataUrl: string;
  type: string;
  compressedImage: IImage;
}

export class SourceImage implements IImage {
  public fileName: string;
  public imageObjectUrl: string;
  public imageDataUrl: string;
  public type: string;
  public compressedImage: IImage;
}
