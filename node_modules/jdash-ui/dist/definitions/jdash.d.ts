import { Dashboard } from './dashboard';
import * as axios from 'axios';
import { ThemeManager } from './theme';
import { DashletModule } from './dashboard/dashlet';
import { LocalStorageProvider } from './provider/localstorage';
import { ApiProvider } from './provider/api';
import { DashletPanel } from './dashboard/dashletpanel';
import { DashletEditorPanel } from './dashboard/dashleteditorpanel';
import { Component } from './core';
import { HtmlElement, Configuration } from './core';
import { GridLayout } from './layout/grid';
import { GenericLayout } from './layout/generic';
import { DashboardLayout } from './layout';
import Helper from './helper';
export declare var JDash: {
    HtmlElement: typeof HtmlElement;
    Helper: typeof Helper;
    Component: typeof Component;
    DashletModule: typeof DashletModule;
    DashletPanel: typeof DashletPanel;
    DashletEditorPanel: typeof DashletEditorPanel;
    LocalStorageProvider: typeof LocalStorageProvider;
    GenericLayout: typeof GenericLayout;
    GridLayout: typeof GridLayout;
    DashboardLayout: typeof DashboardLayout;
    Configuration: typeof Configuration;
    ThemeManager: typeof ThemeManager;
    Dashboard: typeof Dashboard;
    Http: typeof axios;
    Provider: ApiProvider;
    dashlet: (id: string | Object | Function, handler: Object | Function) => void;
    define: (id: string | Object | Function, handler: Object | Function) => any;
    ready: (fn: any) => void;
};
declare global  {
    interface Window {
        jdash: any;
    }
}
