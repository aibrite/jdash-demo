/// <reference types="es6-promise" />
import { IClientProvider, GetDashboardResult, DashboardCreateModel, DashboardUpdateModel, ISearchDashboards, DashboardModel, CreateResult, Query, QueryResult, DashletCreateModel, DashletUpdateModel } from 'jdash-core';
export declare type fnType = (callback: Function) => string;
export interface ITokenProvider {
    apikey: string | fnType;
    getUserToken: fnType;
}
export declare class ApiProvider implements IClientProvider {
    private tokenProvider;
    private currentUserToken;
    static getUrl(): string;
    init(tokenProvider: ITokenProvider): void;
    constructor();
    private refreshUserToken();
    private getAuthorizationHeaderContent();
    private getDefaultRequestConfig(url);
    private ensureTokenReceived(err, config);
    private get<T>(url);
    private post<T>(url, data?);
    private makeRequest(config);
    getDashboard(id: string): Promise<GetDashboardResult>;
    createDashboard(model: DashboardCreateModel): Promise<CreateResult>;
    getMyDashboards(query?: Query): Promise<QueryResult<DashboardModel>>;
    searchDashboards(search?: ISearchDashboards, query?: Query): Promise<QueryResult<DashboardModel>>;
    deleteDashboard(id: string): Promise<any>;
    saveDashboard(id: string, updateValues: DashboardUpdateModel): Promise<any>;
    createDashlet(model: DashletCreateModel): Promise<CreateResult>;
    getDashletsOfDashboard(dashboardId: string): Promise<Array<DashletCreateModel>>;
    deleteDashlet(id: string): Promise<any>;
    saveDashlet(id: string, updateValues: DashletUpdateModel): Promise<any>;
}
