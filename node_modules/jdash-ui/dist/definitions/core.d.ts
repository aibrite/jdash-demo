export declare type KeyValue<T> = {
    [key: string]: T;
};
declare global  {
    interface Window {
        customElements: any;
    }
}
export declare class Configuration {
    changeCallback: Function;
    set(key: string, value: any): boolean;
    get(key: string): any;
    init(initialValues: KeyValue<any>): this;
    constructor(changeCallback: Function);
}
export declare class HtmlElement extends HTMLElement {
    private created;
    private connected;
    private disconnected;
    private initialized;
    private attributeChanged;
    protected isInitialized: boolean;
    fireEvent(name: string, detail?: any, cancellable?: boolean, canBubble?: boolean): boolean;
    executeAction(name: string, detail?: any, originalEvent?: CustomEvent): boolean;
    constructor();
    callUserCallback(cb: string, args?: Array<any>): void;
    getType(): any;
    initializeElement(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export declare class TemplatedElement extends HtmlElement {
    template: HTMLTemplateElement;
    elementContent: HtmlElement;
    useShadow: boolean;
    constructor();
    createShadowRoot(): any;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    addToSlot(newContent: Node | HTMLElement, appendAlways?: boolean): Node;
    getDefaultTemplate(): HTMLTemplateElement;
    locateTemplate(): HTMLTemplateElement;
    createChildren(parent: HTMLElement): void;
    connectedCallback(): void;
}
export declare class ComponentGeneratedElement<T extends Component> extends TemplatedElement {
    protected component: T;
    locateTemplate(): HTMLTemplateElement;
    initializeElement(): void;
    connectedCallback(): void;
}
export declare class ComponentElement extends ComponentGeneratedElement<Component> {
}
export interface ComponentOptions {
    createdCallback?: Function;
    elementClass?: typeof HTMLElement;
    is?: string;
}
export declare class Component extends HtmlElement {
    template: HTMLTemplateElement;
    options: ComponentOptions;
    elementRegistered: boolean;
    elementClass: typeof HTMLElement;
    defineScriptExecuted: boolean;
    static definedElements: KeyValue<Component>;
    static reservedAttributes: string[];
    initElement(el: HTMLElement, defaults?: KeyValue<string>): HTMLElement;
    constructor();
    static getByTag(tag: any): Component;
    static locate(options: string | ComponentOptions | Function): Component;
    setElementClassProperties(): void;
    getBaseElementClass(): typeof ComponentElement;
    generateElementClass(): typeof HTMLElement;
    registerElement(): void;
    connectedCallback(): void;
    runDefineScript(options: ComponentOptions): void;
    static elementTag(node: HTMLElement): string;
    readonly elementTag: string;
    static define(id: string | Function | Object, handler: Function | Object): void;
}
export {};
