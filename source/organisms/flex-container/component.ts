import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';
import {ImgComponent} from '../../atoms/img/component';
import {AbstractInputData} from '../../abstract/component/model';
import {AbstractComponent} from '../../abstract/component/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {FlexContainerInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-flex-container')
export class FlexComponent extends AbstractComponent<FlexContainerInputData,
    undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'FlexComponent';

    @property()
    private _componentsInputData: AbstractInputData[] = [];

    constructor() {
        super();
    }

    get componentsInputData(): AbstractInputData[] {
        return this._componentsInputData !== undefined
            ? this._componentsInputData
            : [];
    }

    set componentsInputData(value: AbstractInputData[]) {
        this._componentsInputData = value;
    }

    @property()
    private _componentsMap = new Map<AbstractInputData,
        AbstractComponent<any, any>>();

    get componentsMap(): Map<AbstractInputData, AbstractComponent<any, any>> {
        return this._componentsMap;
    }

    set componentsMap(
        value: Map<AbstractInputData, AbstractComponent<any, any>>
    ) {
        this._componentsMap = value;
    }

    protected createComponentFromData(
        componentInputData: AbstractInputData
    ): AbstractComponent<any, any> {
        console.log(
            'create component from inputData= ' +
            componentInputData.componentIdentifier
        );
        let component = this._componentsMap.get(componentInputData);
        if (component == null) {
            component = ComponentLoader.INSTANCE.createComponentFromInputData(
                componentInputData
            );
            this._componentsMap.set(componentInputData, component);
        }
        console.log(
            'component created: ' + componentInputData.componentIdentifier
        );
        return component;
    }

    @property()
    gridClazz: string = 'grid_100';

    @property()
    itemClazz: string = '';

    @property()
    columnFlexBasisValues: string[] = [];

    @property()
    columnFlexBasisValue: string = 'auto';

    @query('#slotElement')
    slotElement: HTMLSlotElement | undefined;

    render() {
        return html`
         <div class="grid ${this.gridClazz}">
            ${guard(
            this.componentsInputData,
            () =>
                html`
                     ${repeat(
                    this.componentsInputData,
                    (componentInputData, index) => html`
                           <div
                              class="grid_content ${this.itemClazz}"
                              style="${this.getFlexBasis(index)};"
                           >
                              ${this.createComponentFromData(
                        componentInputData
                    )}
                           </div>
                        `
                )}
                  `
        )}
            <slot id="slotElement"></slot>
         </div>
      `;
    }

    getFlexBasis(index: number): string {
        let flexBasisValue =
            this.columnFlexBasisValues !== undefined
                ? this.columnFlexBasisValues[index] !== undefined
                ? this.columnFlexBasisValues[index]
                : this.columnFlexBasisValue
                : undefined;
        return 'flex-basis: ' + flexBasisValue + ';max-width: ' + flexBasisValue;
    }

    updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (this.shadowRoot === null) {
            console.debug('shadow root not active');
            return;
        }

        if (this.slotElement == null) {
            return;
        }

        let elements: Element[] = this.slotElement.assignedElements();

        for (let index = 0; index < elements.length; index++) {
            let element: Element = elements[index];

            let classList = element.classList;
            if (!classList.contains('grid_content')) {
                classList.add('grid_content');
            }
            if (this.itemClazz.length > 0 && !classList.contains(this.itemClazz)) {
                classList.add(this.itemClazz);
            }

            let currentStyle: string | null = element.getAttribute('style');
            if (currentStyle === null) {
                element.setAttribute('style', this.getFlexBasis(index) + ';');
            } else {
                let currentStyles = currentStyle.split(';');
                currentStyle = '';
                currentStyles.forEach((value) => {
                    if (value.length > 0 && value.lastIndexOf('flex-basis') === -1 && value.lastIndexOf('max-width') === -1) {
                        currentStyle += value + ';';
                    }
                });
                currentStyle += this.getFlexBasis(index) + ';';
                element.setAttribute('style', currentStyle);
            }

        }
    }

    inputDataChanged() {
        this.componentsInputData =
            this.inputData.componentsInputData !== undefined
                ? this.inputData.componentsInputData
                : [];

        this.gridClazz =
            this.inputData.gridClazz !== undefined
                ? this.inputData.gridClazz
                : 'grid_100';

        this.itemClazz =
            this.inputData.itemClazz !== undefined ? this.inputData.itemClazz : '';

        this.columnFlexBasisValue =
            this.inputData.columnFlexBasisValue !== undefined
                ? this.inputData.columnFlexBasisValue
                : 'auto';

        this.columnFlexBasisValues =
            this.inputData.columnFlexBasisValues !== undefined
                ? this.inputData.columnFlexBasisValues
                : [];
    }

    getOutputData(): undefined {
        return undefined;
    }

    getDefaultInputData(): FlexContainerInputData {
        return <FlexContainerInputData>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_100',
            columnFlexBasisValues: ['50%', '50%'],
            componentsInputData: [
                new ImgComponent().getDefaultInputData(),
                new ImgComponent().getDefaultInputData()
            ]
        };
    }
}
