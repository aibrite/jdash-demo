/// <reference types="es6-promise" />
import { DashboardModel, DashletModel, DashletPositionModel, IClientProvider } from 'jdash-core';
import { DashletModule, IDashletElement } from './dashlet';
import { TemplatedElement } from '../core';
import { DashboardLayout } from '../layout';
import { GenericLayout } from '../layout/generic';
export declare const DashboardState: {
    none: string;
    loading: string;
    loaded: string;
};
export declare class Dashboard extends TemplatedElement {
    protected _provider: IClientProvider;
    protected _layout: DashboardLayout;
    private _model;
    _state: string;
    static readonly observedAttributes: string[];
    getType(): string;
    state: string;
    readonly provider: IClientProvider;
    model: DashboardModel;
    initializeLayout(): void;
    layout: DashboardLayout;
    unload(): void;
    load(id: string | DashboardModel): Promise<any>;
    moveDashlet(dashletElement: IDashletElement, to: DashletPositionModel): Promise<void>;
    locateTemplate(): HTMLTemplateElement;
    getDashletAt(position: DashletPositionModel): Element;
    getDashletPosition(dashletElement: IDashletElement): DashletPositionModel;
    connectedCallback(): void;
    locateProvider(): IClientProvider;
    hideDashlets(hide: boolean): void;
    collapseDashlets(hide: boolean): void;
    toggleDashlets(hide: boolean): void;
    toggleCollapseDashlets(hide: boolean): void;
    createDefaultLayout(): GenericLayout;
    initializeElement(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    addDashlet(dashletEl: string | IDashletElement | DashletModel | DashletModule, position?: DashletPositionModel): void;
}
