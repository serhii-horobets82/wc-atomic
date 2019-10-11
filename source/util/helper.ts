export class ShadowDomHelper {

    indexOf(contentSlotElement: HTMLSlotElement | undefined, searchedElement: any) {
        if (contentSlotElement != null) {
            let contentSlotelements: Element[] = contentSlotElement.assignedElements();
            for (let index = 0; index < contentSlotelements.length; index++) {
                let element: Element = contentSlotelements[index];
                if (element === searchedElement) {
                    return index;
                }
            }
        }
        return -1;
    }

    setProperty(contentSlotElement: HTMLSlotElement | undefined, property: string, value: any, elementType: any, childIndex: number | null) {
        if (contentSlotElement != null) {
            let contentSlotelements: Element[] = contentSlotElement.assignedElements();
            let elementIndex = 0;
            for (let index = 0; index < contentSlotelements.length; index++) {
                let element: Element = contentSlotelements[index];
                if (element instanceof elementType) {
                    if (childIndex == null || childIndex == elementIndex) {
                        console.log('set property ' + property + ' for slotted element, value=' + value + ', elementIndex=' + elementIndex);
                        (<any>element)[property] = value;
                    }
                    elementIndex++;
                }
            }
        }
    }

    getElement<T extends Element>(contentSlotElement: HTMLSlotElement | undefined, elementType: any, indexOf: number): T | null {
        if (contentSlotElement != null) {
            let contentSlotelements: Element[] = contentSlotElement.assignedElements();
            let elementIndex = 0;
            for (let index = 0; index < contentSlotelements.length; index++) {
                let element: Element = contentSlotelements[index];
                if (element instanceof elementType) {
                    if (indexOf == elementIndex) {
                        return <T>element;
                    }
                    elementIndex++;
                }
            }
        }
        return null;
    }


}

export const SHADOW_DOM_HELPER = new ShadowDomHelper();


