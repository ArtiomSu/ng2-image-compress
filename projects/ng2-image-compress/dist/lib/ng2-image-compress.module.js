import * as tslib_1 from "tslib";
var ImageCompressModule_1;
import { NgModule } from '@angular/core';
import { ImageUtilityService } from './imageutilityservice';
import { ImageCompressService } from './ng2-image-compress.service';
let ImageCompressModule = ImageCompressModule_1 = class ImageCompressModule {
    static forRoot() {
        return {
            ngModule: ImageCompressModule_1,
            providers: [ImageCompressService, ImageUtilityService]
        };
    }
};
ImageCompressModule = ImageCompressModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [ImageUtilityService, ImageCompressService]
    })
], ImageCompressModule);
export { ImageCompressModule };
//# sourceMappingURL=ng2-image-compress.module.js.map