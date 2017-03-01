import { Component, ComponentElement, ComponentGeneratedElement } from '../core';
import { IDashletElement } from './dashlet';
export interface IDashletPanel extends ComponentElement {
    dashlet: IDashletElement;
}
export declare class DashletPanel extends ComponentGeneratedElement<DashletPanelModule> implements IDashletPanel {
    private _dashlet;
    dashlet: IDashletElement;
    createChildren(parent: HTMLElement): void;
    getType(): string;
    connectedCallback(): void;
}
export declare class DashletPanelModule extends Component {
    getBaseElementClass(): typeof DashletPanel;
}
