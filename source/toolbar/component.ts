import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ComponentLoader} from '../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {FlexJustifyContent} from '../flex-container/component';

const componentCSS = require('./component.css');

export class ToolbarAlignment {
    static HORIZONTAL: string = 'horizontalAlignment';
    static VERTICAL: string = 'verticalAlignment';
}

export class ToolbarInputData extends AbstractInputData {
    toolbarInputData: AbstractInputData[] = [];
    flexJustifyContent: string = FlexJustifyContent.FLEX_START;
    toolbarAlignment: string = ToolbarAlignment.HORIZONTAL;
    height: string = 'auto';
    width: string = 'auto';
}

@customElement('component-toolbar')
export class ToolbarComponent extends AbstractComponent<ToolbarInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ToolbarComponent';

    @property()
    toolbarInputData: AbstractInputData[] = [];

    @property()
    toolbarAlignment: string = ToolbarAlignment.HORIZONTAL;

    @property()
    flexJustifyContent: string = FlexJustifyContent.FLEX_START;

    @property()
    height: string = 'auto';

    @property()
    width: string = 'auto';

    constructor() {
        super();
    }

    render() {
        return html`
         <div
            class="toolbar ${this.toolbarAlignment}"
            style="justify-content:${this.flexJustifyContent};height:${this.height};width:${this.width};"
         >
            <slot></slot>
            ${guard(
            this.toolbarInputData,
            () =>
                html`
                     ${repeat(
                    this.toolbarInputData,
                    (inputData) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                        `
                )}
                  `
        )}
         </div>
      `;
   }

   getDefaultInputData(): ToolbarInputData {
       return <ToolbarInputData>{};
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
       let defaultData: ToolbarInputData = new ToolbarInputData();
       this.toolbarInputData = this.inputData.toolbarInputData;
       this.toolbarAlignment = this.basicService.getValue(this.toolbarAlignment, defaultData.toolbarAlignment);
       this.flexJustifyContent = this.basicService.getValue(this.flexJustifyContent, defaultData.flexJustifyContent);
       this.height = this.basicService.getValue(this.height, defaultData.height);
       this.width = this.basicService.getValue(this.width, defaultData.width);
   }
}
