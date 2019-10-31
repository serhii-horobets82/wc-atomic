import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../../abstract-component/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {IconComponent} from "../../atoms/icon/component";
import {MenubarInputData} from "./model";
import {AuthenticatedIconComponent} from "../../molecules/authenticated-icon/component";
import {baseHelper} from "../../index";

const componentCSS = require('./component.css');

@customElement('component-menubar')
export class MenubarComponent extends AbstractComponent<MenubarInputData, undefined> {
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
    clazz: string = 'menubar';

    constructor() {
        super();
    }

    render() {
        return html`
         <div class="menubar ${this.clazz}">

            <div class="left">

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
               </div>
               
                           <div class="center">

               
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
               
</div>
            <div class="right">
               
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
</div>
         </div>
      `;
    }

    getDefaultInputData(): MenubarInputData {
        return <MenubarInputData>{
            componentIdentifier: MenubarComponent.IDENTIFIER,
            leftInputData: [new IconComponent().getDefaultInputData()],
            mainInputData: [],
            rightInputData: [new AuthenticatedIconComponent().getDefaultInputData()]
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.clazz = baseHelper.getValue(this.inputData.clazz, '');
        this.leftInputData = this.inputData.leftInputData;
        this.mainInputData = this.inputData.mainInputData;
        this.rightInputData = this.inputData.rightInputData;
    }
}
