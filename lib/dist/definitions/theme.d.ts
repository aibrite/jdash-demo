export interface ThemeDefinition {
    name: string;
    cssClass: string;
}
export declare class ThemeManager {
    private static themes;
    private static currentThemeLibrary;
    private static currentTheme;
    static init(name?: string, library?: string): void;
    static loadFromLocalstorage(): boolean;
    static saveToLocalStorage(): void;
    static getThemes(library?: string): ThemeDefinition[];
    static registerDefinition(library: string, definition: Array<ThemeDefinition>): void;
    static getCurrentTheme(): {
        library: string;
        theme: ThemeDefinition;
    };
    static clearCurrentTheme(): void;
    static setCurrentTheme(name: string, library?: string): void;
}
