import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import {
   AbstractComponent} from '../abstract/abstract-component';
import { LinkComponent } from '../link/link';
import {AbstractInputData} from "../../interface/atoms";

const componentCSS = require('./component-viewer.scss');

export interface LeafViewer extends AbstractInputData {
   component: AbstractComponent<any, any>;
}

@customElement('component-component-viewer')
export class ComponentViewerComponent extends AbstractComponent<
   LeafViewer,
   any
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ComponentViewerComponent';

   @property()
   component: AbstractComponent<any, any>;

   render() {
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
                ${this.component}
            </component-tile>
            </component-flex-container>
            
            <component-h2
               text=""
               subtext="So wird sie als TAG erstellt:"
               clazz=""
            ></component-h2>
            <component-code code="${this.component.outerHTML}"></component-code>
            <component-h2
               text=""
               subtext="So kannst du sie programmatisch initialisieren:"
               clazz=""
            ></component-h2>
            <component-code code="${this.getCode()}"></component-code>
            <component-h2
               text=""
               subtext="Die Input-Daten der Komponente sehen so aus:"
               clazz=""
            ></component-h2>
            <component-code
               code="${this.component.getInputDataAsJavascriptString()}"
            ></component-code>
            <component-h2
               text=""
               subtext="Die Output-Daten der Komponente sehen so aus:"
               clazz=""
            ></component-h2>
            <component-code
               code="${JSON.stringify(this.component.getOutputData(), null, 2)}"
            ></component-code>
            <component-h2
               text=""
               subtext="Events die von der Komponente geschmießen werden:"
               clazz=""
            ></component-h2>
            <component-code
               code="${this.component.getEventList()}"
            ></component-code>
         </div>
      `;
   }

   public getCode(): string {
      let clazzName = this.component.getClazzName();
      let clazzNameToLowerCase = clazzName.toLowerCase();
      return (
         'let ' +
         clazzNameToLowerCase +
         ' = new ' +
         clazzName +
         '();\n' +
         clazzNameToLowerCase +
         '.inputData = ' +
         this.component.getInputDataAsJavascriptString() +
         ';'
      );
   }

   getDefaultInputData(): LeafViewer {
      return <LeafViewer>{
         componentIdentifier: ComponentViewerComponent.IDENTIFIER,
         component: new LinkComponent()
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.component = this.inputData.component;
   }
}
