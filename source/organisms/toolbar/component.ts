import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {AbstractInputData} from '../../abstract/component/model';
import {ComponentLoader} from '../../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {IconComponent} from "../../atoms/icon/component";
import {ToolbarInputData} from "./model";
import {AuthenticatedIconComponent} from "../../molecules/authenticated-icon/component";

const componentCSS = require('./component.css');

@customElement('component-toolbar')
export class ToolbarComponent extends AbstractComponent<ToolbarInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ToolbarComponent';

    @property()
    leftInputData: AbstractInputData[] = [];

    @property()
    mainInputData: AbstractInputData[] = [];

    @property()
    rightInputData: AbstractInputData[] = [];

    constructor() {
        super();
    }

    render() {
        return html`
         <div class="toolbar">
            <component-flex-container
               gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween"
            >
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
            this.leftInputData,
            () =>
                html`
                           ${repeat(
                    this.leftInputData,
                    (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                        inputData
                    )}
                              `
                )}
                        `
        )}
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
            this.mainInputData,
            () =>
                html`
                           ${repeat(
                    this.mainInputData,
                    (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                        inputData
                    )}
                              `
                )}
                        `
        )}
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
            this.rightInputData,
            () =>
                html`
                           ${repeat(
                    this.rightInputData,
                    (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                        inputData
                    )}
                              `
                )}
                        `
        )}
               </component-flex-container>
            </component-flex-container>
         </div>
      `;
    }

    getDefaultInputData(): ToolbarInputData {
        return <ToolbarInputData>{
            componentIdentifier: ToolbarComponent.IDENTIFIER,
            leftInputData: [new IconComponent().getDefaultInputData()],
            mainInputData: [],
            rightInputData: [new AuthenticatedIconComponent().getDefaultInputData()]
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.leftInputData = this.inputData.leftInputData;
        this.mainInputData = this.inputData.mainInputData;
        this.rightInputData = this.inputData.rightInputData;
    }
}
