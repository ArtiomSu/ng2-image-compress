import {ModuleWithProviders, NgModule} from '@angular/core';
import {ImageUtilityService} from './image-utility.service';
import {ImageCompressService} from './ng2-image-compress.service';

@NgModule({
  imports: [],
  providers: [ImageUtilityService, ImageCompressService]
})
export class ImageCompressModule {

  static forRoot(): ModuleWithProviders<ImageCompressModule> {
    return {
      ngModule: ImageCompressModule,
      providers: [ImageCompressService, ImageUtilityService]
    };
  }
}
