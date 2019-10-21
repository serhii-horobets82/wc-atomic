import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../../abstract/component/component';
import {AbstractInputData} from "../../../abstract/component/model";
import {ListItemInputData} from "./model";
import {baseHelper} from "../../../util/base";

const componentCSS = require('./component.css');

@customElement('component-list-item')
export class ListItemComponent extends AbstractComponent<ListItemInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ListItemComponent';

    @property()
    content: AbstractInputData[] = [];

    @property()
    clazz: string = '';


    render() {
        return html`
                <div class="listItem ${this.clazz}">
                    <component-flex-container>
                        <slot></slot>                           
                    </component-flex-container>
                </div>
      `;
    }

    getDefaultInputData(): ListItemInputData {
        return <ListItemInputData>{
            componentIdentifier: ListItemComponent.IDENTIFIER,
            content: [],
        };
    }

    getOutputData(): any {
        return {};
    }

    protected inputDataChanged() {
        this.clazz = baseHelper.getValue(this.inputData.clazz, '');
        this.content = this.inputData.content;
    }

}
