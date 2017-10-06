import { Component, Input, ElementRef } from '@angular/core';
import { Config } from "../../../../../config/config";
import { SpecmateDataService } from "../../../../../services/data/specmate-data.service";
import { Type } from "../../../../../util/Type";
import { Id } from "../../../../../util/Id";
import { ProcessStep } from "../../../../../model/ProcessStep";
import { DraggableElementBase } from "../draggable-element-base";

@Component({
    moduleId: module.id,
    selector: '[process-step-graphical-node]',
    templateUrl: 'process-step-graphical-node.component.svg',
    styleUrls: ['process-step-graphical-node.component.css']
})

export class ProcessStepGraphicalNode extends DraggableElementBase<ProcessStep> {
    public nodeType: { className: string; } = ProcessStep;

    public get dimensions(): {width: number, height: number} {
        return {
            width: Config.CEG_NODE_WIDTH,
            height: Config.CEG_NODE_HEIGHT
        };
    }
    
    @Input()
    node: ProcessStep;

    public get element(): ProcessStep {
        return this.node;
    }

    @Input()
    selected: boolean;

    @Input()
    valid: boolean;

    private get title(): string {
        return this.node.name;
    }

    constructor(protected dataService: SpecmateDataService) {
        super();
    }
}