import { KeyValue } from './core';
export interface InstantiateTemplateOptions {
    position?: string;
    preProcess?: Function;
    postProcess?: Function;
    container?: HTMLElement;
}
export declare let TemplateInstantiatePosition: {
    insert: string;
    append: string;
    sibling: string;
    auto: string;
};
export default class Helper {
    static elementIndex(parent: Element, child: Element): number;
    static cloneElement(source: HTMLElement, deep?: boolean | number, discardedAttributes?: KeyValue<string | Array<string>>, existingAttributes?: KeyValue<string | Array<string>>): HTMLElement;
    static moveElement(el: Element, direction: string, selector: string): void;
    static executeAction(action: string, actionParams: KeyValue<string>, originalEvent?: Event, context?: Window | Document | HTMLElement): boolean;
    static setBindings(container: HTMLElement, context?: Window | Document | HTMLElement, selector?: string): void;
    static bindActions(container: HTMLElement, parameters?: KeyValue<any>, context?: Window | Document | HTMLElement): void;
    static addActionListener(action: string, handler: EventListener, context: Window | Document | HTMLElement): void;
    static ensureId(container: HTMLElement, attr: string): void;
    static locateElementType(container: HTMLElement, type: typeof HTMLElement, deep?: boolean): HTMLElement[];
    static getSiblings(el: HTMLElement, selector: string): any;
    static getImmidiateSiblings(el: HTMLElement, selector: string, includeSelf: boolean): any;
    static extractTemplate(template: HTMLTemplateElement): HTMLElement;
    static instantiateTemplate(template: HTMLTemplateElement, targets?: string | Node | NodeListOf<any>, options?: InstantiateTemplateOptions): any[];
    static locateTemplate(container: HTMLElement, jtype: string, deep?: boolean): HTMLTemplateElement;
    static removeTemplateInstances(container: HTMLElement, templateId: string | Array<string> | HTMLTemplateElement): void;
    static hideTemplateInstances(container: HTMLElement, templateId: string | Array<string>, hide: boolean): void;
    static hideElements(targets: Node | NodeListOf<any>, hide: boolean): void;
    static removeElements(targets: Node | NodeListOf<any>): void;
    static getElementsNotIn(container: any, selector: any, excludeContainerSelector: any): any[];
    static getContainingType(el: HTMLElement, jtype: string): HTMLElement;
    static makeid(): string;
    static fireEvent(source: HTMLElement | Window | Document, name: string, detail?: any, cancellable?: boolean, canBubble?: boolean): boolean;
    static extends(d: any, b: any): void;
    static inherit(base: any): () => any;
}
