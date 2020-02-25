import {html, TemplateResult} from "lit-element";
import {
    AbstractComponent, AbstractInputData,
    IconComponent,
    InputfieldComponent,
    TypographyComponent,
    TypographyInputData
} from "../..";

export class ColumnEventData {
    rowData: any = {};
    rowIndex: number = -1;
    columnInputData: AbstractInputData = AbstractInputData.prototype;
    columnIndex: number = -1;
    sourceEvent: CustomEvent = <CustomEvent>{};
}

export class IteratorComponentService {

    public static EVENT_COLUMN_CHANGED: string = 'component-iterator-column-changed';

    public static EVENT_COLUMN_CLICKED: string = 'component-iterator-column-clicked';

    private static uniqueInstance: IteratorComponentService;

    static getUniqueInstance() {
        if (!IteratorComponentService.uniqueInstance) {
            IteratorComponentService.uniqueInstance = new IteratorComponentService();
        }
        return IteratorComponentService.uniqueInstance;
    }

    createColumnComponent(
        parentComponent: AbstractComponent<any, any>,
        rowData: any,
        componentInputData: AbstractInputData,
        rowIndex: number,
        columnIndex: number
    ): TemplateResult {
        let componentIdentifier = componentInputData.componentIdentifier;
        switch (componentIdentifier) {
            case TypographyComponent.IDENTIFIER:
                (<TypographyInputData>componentInputData).clazz = 'ellipsis';
                return html`
               <component-typography .inputData="${componentInputData}"></component-typography>
            `;
            case IconComponent.IDENTIFIER:
                return html`
               <component-icon
                  @component-icon-click="${(event: CustomEvent) => {
                    this.createColumnClickEvent(parentComponent, rowData, componentInputData, event, rowIndex, columnIndex);
                }}"
                  .inputData="${componentInputData}"
               ></component-icon>
            `;
            case InputfieldComponent.IDENTIFIER:
                return html`
               <component-inputfield
                  .inputData="${componentInputData}"
                  @component-inputfield-change="${(event: CustomEvent) => {
                    this.createColumnChangeEvent(parentComponent, componentInputData, rowData, event, rowIndex, columnIndex);
                }}"
               ></component-inputfield>
            `;
            default:
                return html``;
        }
    }

    /**
     * if column value change, dispatch a simple custom event with all necessery data for parent object.
     * @param rowData
     * @param event
     * @param rowIndex
     * @param columnIndex
     */
    private createColumnChangeEvent(parentComponent: AbstractComponent<any, any>, rowData: any, componentInputData: AbstractInputData, event: CustomEvent, rowIndex: number, columnIndex: number) {
        let columnChangedData: ColumnEventData = {
            rowData: rowData,
            rowIndex: rowIndex,
            columnInputData: componentInputData,
            columnIndex: columnIndex,
            sourceEvent: event.detail
        };

        parentComponent.dispatchSimpleCustomEvent(IteratorComponentService.EVENT_COLUMN_CHANGED, columnChangedData);

    }

    private createColumnClickEvent(parentComponent: AbstractComponent<any, any>, row: any, componentInputData: AbstractInputData, event: CustomEvent, rowIndex: number, columnIndex: number) {
        let columnChangedData: ColumnEventData = {
            rowData: row,
            rowIndex: rowIndex,
            columnInputData: componentInputData,
            columnIndex: columnIndex,
            sourceEvent: event.detail
        };

        parentComponent.dispatchSimpleCustomEvent(IteratorComponentService.EVENT_COLUMN_CLICKED, columnChangedData);

    }


}