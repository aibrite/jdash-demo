/// <reference types="es6-promise" />
import { IClientProvider, DashletModel } from 'jdash-core';
import { IDashletEditorPanel } from './dashleteditorpanel';
import { DashboardLayout } from '../layout';
import { Component, ComponentGeneratedElement, KeyValue, Configuration } from '../core';
import { IDashletPanel } from './dashletpanel';
export declare const IDashletElementStatus: {
    created: string;
    loaded: string;
};
export interface IDashletElement extends HTMLElement {
    panel: HTMLElement;
    layout: DashboardLayout;
    editor: IDashletEditorElement;
    viewMode: string;
    config: Configuration;
    status: string;
    model: DashletModel;
    saveConfiguration(): any;
    updateFromModel(): any;
}
export interface IDashletEditorElement extends HTMLElement {
    dashlet: IDashletElement;
    panel: IDashletEditorPanel;
}
export declare let DashletViewMode: {
    readonly: string;
    configure: string;
    preview: string;
};
export declare class DashletContext {
}
export declare class Dashlet extends ComponentGeneratedElement<DashletModule> implements IDashletElement {
    layout: DashboardLayout;
    editor: IDashletEditorElement;
    status: string;
    _configObject: Configuration;
    _viewMode: string;
    private _panel;
    private _provider;
    _model: DashletModel;
    readonly canBeConfigured: boolean;
    model: DashletModel;
    updateFromModel(): void;
    updateModel(): void;
    panel: IDashletPanel;
    readonly Provider: IClientProvider;
    viewMode: string;
    getType(): string;
    constructor();
    setViewMode(newVal: string): void;
    setDashletViewModeReadonly(enable: boolean): void;
    setDashletViewModePreview(enable: boolean): void;
    setDashletViewModeConfigure(enable: boolean): void;
    config: any;
    configurationChangeHandler(event: CustomEvent): void;
    configurationSaveHandler(event: CustomEvent): void;
    saveConfiguration(): Promise<any>;
    static readonly observedAttributes: string[];
    createPanelForDashletEditor(editorElement: IDashletEditorElement): HTMLElement;
    openConfiguration(): void;
    configureDashletActionHandler(event: CustomEvent): void;
    cloneDashletActionHandler(event: CustomEvent): Promise<any>;
    removeDashletActionHandler(event: CustomEvent): Promise<void>;
    arrangeTitleNodes(): void;
    editDashletTitleActionHandler(event: CustomEvent): void;
    listenforActions(): void;
    initializeElement(): void;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
}
export declare class DashletEditor extends ComponentGeneratedElement<DashletEditorModule> implements IDashletEditorElement {
    dashlet: IDashletElement;
    panel: IDashletEditorPanel;
}
export declare class DashletEditorModule extends Component {
    getBaseElementClass(): typeof DashletEditor;
}
export declare class DashletModule extends Component {
    getBaseElementClass(): typeof Dashlet;
    static getModules(): any[];
    static getByTag(tag: any): DashletModule;
    createEditorForDashlet(dashlet: HTMLElement): void;
    static createModule(id: string | HTMLElement, defaults?: KeyValue<any>): DashletModule;
}
