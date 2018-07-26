import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTimerComponent } from './cd-timer';
var CdTimerModule = (function () {
    function CdTimerModule() {
    }
    return CdTimerModule;
}());
export { CdTimerModule };
CdTimerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CdTimerComponent
                ],
                exports: [
                    CdTimerComponent
                ]
            },] },
];
/** @nocollapse */
CdTimerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=cd-timer.module.js.map