import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalService} from "./modal.service";
import {CenterModalContainer} from "./containers/center/center-modal-container.component";
import {SideModalContainer} from "./containers/side/side-modal-container.component";
import {InlineModalContainer} from "./containers/inline/inline-modal-container.component";
import {ConfirmationModal} from "./modals/confirmation-modal/confirmation-modal.component";
import {StatusModal} from "./modals/status-modal/status-modal.component";

export * from './modal.component';
export * from './modal.model';
export * from './modal.service';
export * from './modal-container.component';
export * from './containers/center/center-modal-container.component';
export * from './containers/side/side-modal-container.component';
export * from './containers/inline/inline-modal-container.component';
export * from './modals/confirmation-modal/confirmation-modal.component';
export * from './modals/status-modal/status-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    ConfirmationModal,
    StatusModal
  ],
  declarations: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    ConfirmationModal,
    StatusModal
  ],
  entryComponents: [
    CenterModalContainer,
    SideModalContainer,
    InlineModalContainer,
    ConfirmationModal,
    StatusModal
  ]
})
export class SurveyorModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SurveyorModalModule,
      providers: [
        ModalService
      ]
    };
  }
}
