export interface NgImage {
  fileName: string;
  imageObjectUrl: string | ArrayBuffer;
  imageDataUrl: string;
  type: string;
  compressedImage: NgImage;
}

export class NgSourceImage implements NgImage {
  public fileName: string;
  public imageObjectUrl: string;
  public imageDataUrl: string;
  public type: string;
  public compressedImage: NgImage;
}
