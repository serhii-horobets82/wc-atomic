import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {LinkComponent} from '../../atoms/link/component';
import {LeafViewer} from "./model";
import {AbstractInputData} from "../../abstract/component/model";
import {ComponentLoader} from "../../abstract/component-loader";

const componentCSS = require('./component.css');

@customElement('component-component-viewer')
export class ComponentViewerComponent extends AbstractComponent<LeafViewer,
    any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ComponentViewerComponent';

    @property()
    componentInputData: AbstractInputData | undefined;

    render() {

        if(this.componentInputData == undefined)
            throw new Error("please define componentInputData");

        let abstractComponent = new ComponentLoader().createComponentFromInputData(this.componentInputData);

        return html`
         <div
            @component-textfield-keyup="${this.reqUpdate}"
            @component-date-value-change="${this.reqUpdate}"
            @component-textarea-keyup="${this.reqUpdate}"
            @component-color-value-change="${this.reqUpdate}"
            @component-checkbox-value-change="${this.reqUpdate}"
            @combobox-component-selection-change="${this.reqUpdate}"
         >
            <component-h2
               text=""
               subtext="So sieht die Komponente aus:"
               clazz=""
            ></component-h2>
            
            <component-flex-container gridClazz="grid_75" columnFlexBasisValue="100%;">
            <component-tile>
                ${abstractComponent}
            </component-tile>
            </component-flex-container>
            
            <component-h2
               text=""
               subtext="So wird sie als TAG erstellt:"
               clazz=""
            ></component-h2>
            <component-code code="${abstractComponent.outerHTML}"></component-code>
            <component-h2
               text=""
               subtext="So kannst du sie programmatisch initialisieren:"
               clazz=""
            ></component-h2>
            <component-code code="${this.getCode(abstractComponent)}"></component-code>
            <component-h2
               text=""
               subtext="Die Input-Daten der Komponente sehen so aus:"
               clazz=""
            ></component-h2>
            <component-code
               code="${abstractComponent.getInputDataAsJavascriptString()}"
            ></component-code>
            <component-h2
               text=""
               subtext="Die Output-Daten der Komponente sehen so aus:"
               clazz=""
            ></component-h2>
            <component-code
               code="${JSON.stringify(abstractComponent.getOutputData(), null, 2)}"
            ></component-code>
            <component-h2
               text=""
               subtext="Events die von der Komponente geschmießen werden:"
               clazz=""
            ></component-h2>
            <component-code
               code="${abstractComponent.getEventList()}"
            ></component-code>
         </div>
      `;
    }

    public getCode(abtractComponent: AbstractComponent<any, any>): string {
        let clazzName = abtractComponent.getClazzName();
        let clazzNameToLowerCase = clazzName.toLowerCase();
        return (
            'let ' +
            clazzNameToLowerCase +
            ' = new ' +
            clazzName +
            '();\n' +
            clazzNameToLowerCase +
            '.inputData = ' +
            abtractComponent.getInputDataAsJavascriptString() +
            ';'
        );
    }

    getDefaultInputData(): LeafViewer {
        return <LeafViewer>{
            componentIdentifier: ComponentViewerComponent.IDENTIFIER,
            componentInputData: new LinkComponent().getDefaultInputData()
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.componentInputData = this.inputData.componentInputData;
    }
}
