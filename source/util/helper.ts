export class SlotHelper {

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

    getElementByProperty<T extends Element>(contentSlotElement: HTMLSlotElement | undefined, elementType: any, propertyName: string): T | null {
        if (contentSlotElement != null) {
            let contentSlotelements: Element[] = contentSlotElement.assignedElements();
            let elementIndex = 0;
            for (let index = 0; index < contentSlotelements.length; index++) {
                let element: Element = contentSlotelements[index];
                if (element instanceof elementType) {
                    if ((<any>element)[propertyName]) {
                        return <T>element;
                    }
                    elementIndex++;
                }
            }
        }
        return null;
    }


    /**
     * return next element, if last is rechead, returned first.
     * @param slotElement
     * @param elementType
     * @param currentElement
     */
    nextElement<T extends Element>(slotElement: HTMLSlotElement | undefined, elementType: any, currentElement: Element) {
        let indexOf: number = this.indexOf(slotElement, currentElement);
        console.info("dddddd: " + indexOf);
        indexOf++;

        if (slotElement == null) {
            return null;
        }

        let retval: T | null = null;

        let contentSlotelements: Element[] = slotElement.assignedElements();
        let elementIndex = 0;
        for (let index = 0; index < contentSlotelements.length; index++) {
            let element: Element = contentSlotelements[index];
            if (element instanceof elementType) {
                if (elementIndex == 0) {
                    retval = <T>element;
                }
                if (indexOf == elementIndex) {
                    retval = <T>element;
                    break;
                }
                elementIndex++;
            }
        }

        return retval;

    }
}

export const SLOT_HELPER = new SlotHelper();


