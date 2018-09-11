import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ExportTestprocedureButtonModule } from
  '../../../../actions/modules/export-testprocedure-button/export-testprocedure-button.module';
import { TestSpecificationGeneratorButtonModule } from
  '../../../../actions/modules/test-specification-generator-button/test-specification-generator-button.module';
import { NavigatorModule } from '../../../../navigation/modules/navigator/navigator.module';
import { AuthModule } from '../../../main/authentication/modules/auth/auth.module';
import { LinksActions } from './components/links-actions.component';
import { AdditionalInformationService } from './services/additional-information.service';

@NgModule({
  imports: [
    // MODULE IMPORTS
    BrowserModule,
    NavigatorModule,
    TestSpecificationGeneratorButtonModule,
    ExportTestprocedureButtonModule,
    TranslateModule,
    AuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    // COMPONENTS IN THIS MODULE
    LinksActions
  ],
  exports: [
    // THE COMPONENTS VISIBLE TO THE OUTSIDE
    LinksActions
  ],
  providers: [
    // SERVICES
    AdditionalInformationService
  ],
  bootstrap: [
    // COMPONENTS THAT ARE BOOTSTRAPPED HERE
  ]
})

export class LinksActionsModule { }
