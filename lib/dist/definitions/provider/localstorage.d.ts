/// <reference types="es6-promise" />
import { KeyValue } from '../core';
import { IClientProvider, GetDashboardResult, DashboardCreateModel, DashboardUpdateModel, ISearchDashboards, DashboardModel, CreateResult, Query, QueryResult, DashletCreateModel, DashletUpdateModel } from 'jdash-core';
export declare class LocalStorageProvider implements IClientProvider {
    static ProviderType: string;
    storage: Storage;
    init(): void;
    constructor(values?: KeyValue<string>);
    getCollection<T>(type: string, id?: string | Function): T[];
    addToCollection(type: string, item: any): {}[];
    saveItem(type: string, data: any): {}[];
    removeItem(type: string, id: string): {}[];
    createDashboard(model: DashboardCreateModel): Promise<CreateResult>;
    getMyDashboards(query?: Query): Promise<QueryResult<DashboardModel>>;
    searchDashboards(search?: ISearchDashboards, query?: Query): Promise<QueryResult<DashboardModel>>;
    getDashboard(id: string): Promise<GetDashboardResult>;
    saveDashboard(id: string, updateValues: DashboardUpdateModel): Promise<any>;
    saveDashlet(id: string, updateValues: DashletUpdateModel): Promise<any>;
    createDashlet(model: DashletCreateModel): Promise<any>;
    deleteDashboard(dashboardId: string): Promise<void>;
    deleteDashlet(id: string): Promise<{}>;
}
