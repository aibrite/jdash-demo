import { DashboardLayout } from './';
export declare class GridLayout extends DashboardLayout {
    getStyles(): {
        dark: string;
        light: string;
    };
    setColumnWidths4Zones(zoneElements: NodeListOf<Element>): void;
    setColumnWidths(): void;
    createChildren(parent: HTMLElement): void;
    connectedCallback(): void;
}
