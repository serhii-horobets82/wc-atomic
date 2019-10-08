import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {AbstractInputData} from '../../abstract/component/model';
import {ComponentLoader} from '../../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {IconComponent} from "../../atoms/icon/component";
import {ToolbarInputData} from "./model";
import {AuthenticatedIconComponent} from "../../molecules/authenticated-icon/component";
import {baseHelper} from "../../util/base";

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

    @property()
    clazz: string = 'toolbar';

    constructor() {
        super();
    }

    render() {
        return html`
         <div class="${this.clazz}">
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
                  <slot name="leftComponents"></slot>
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
        )}<slot name="mainComponents"></slot>
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
                  <slot name="rightComponents"></slot>
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
        this.clazz = baseHelper.getValue(this.inputData.clazz, 'toolbar');
        this.leftInputData = this.inputData.leftInputData;
        this.mainInputData = this.inputData.mainInputData;
        this.rightInputData = this.inputData.rightInputData;
    }
}
