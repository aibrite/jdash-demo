import { Component, ComponentElement, ComponentGeneratedElement } from '../core';
import { IDashletEditorElement } from './dashlet';
export interface IDashletEditorPanel extends ComponentElement {
    editor: IDashletEditorElement;
}
export declare class DashletEditorPanel extends ComponentGeneratedElement<DashletEditorPanelModule> implements IDashletEditorPanel {
    editor: IDashletEditorElement;
    private titleNode;
    closeEditor(canceled: boolean): void;
    getType(): string;
    closeEditorActionHandler(event: CustomEvent): void;
    saveConfigActionHandler(event: CustomEvent): void;
    initializeElement(): void;
    createChildren(parent: HTMLElement): void;
    connectedCallback(): void;
}
export declare class DashletEditorPanelModule extends Component {
    getBaseElementClass(): typeof DashletEditorPanel;
}
