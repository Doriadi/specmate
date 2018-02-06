import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { SpecmateDataService } from '../../../../data/modules/data-service/services/specmate-data.service';
import { ConfirmationModal } from '../../../../notification/modules/modals/services/confirmation-modal.service';
import { NavigatorService } from '../../../../navigation/modules/navigator/services/navigator.service';
import { Config } from '../../../../../config/config';
import { ValidationService } from '../../../../forms/modules/validation/services/validation.service';
import { IContainer } from '../../../../../model/IContainer';

@Component({
    moduleId: module.id.toString(),
    selector: 'common-controls',
    templateUrl: 'common-controls.component.html',
    styleUrls: ['common-controls.component.css']
})
export class CommonControls {

    public connected = true;

    constructor(
            private dataService: SpecmateDataService,
            private validator: ValidationService,
            private modal: ConfirmationModal,
            private navigator: NavigatorService) {
        let timer = Observable.timer(0, Config.CONNECTIVITY_CHECK_DELAY);
        timer.subscribe(() => {
            this.dataService.checkConnection().then((val: boolean) => this.connected = val);
        });
    }

    public save(): void {
        if (this.isSaveEnabled) {
            this.dataService.commit('Save');
        }
    }

    public close(): void {
        this.back();
    }

    public undo(): void {
        if (this.isUndoEnabled) {
            this.dataService.undo();
        }
    }

    private forward(): void {
        if (this.isForwardEnabled) {
            this.navigator.forward();
        }
    }

    private back(): void {
        if (this.isBackEnabled) {
            this.navigator.back();
        }
    }

    public get isSaveEnabled(): boolean {
        return this.isEnabled && this.dataService.hasCommits && this.validator.currentValid;
    }

    public get isUndoEnabled(): boolean {
        return this.isEnabled && this.dataService.hasCommits;
    }

    public get isBackEnabled(): boolean {
        return this.navigator.hasPrevious;
    }

    public get isForwardEnabled(): boolean {
        return this.navigator.hasNext;
    }

    public get isEnabled(): boolean {
        return true;
    }
}