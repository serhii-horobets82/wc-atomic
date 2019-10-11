import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../../abstract/component/component';
import {AbstractInputData} from "../../../abstract/component/model";
import {ListItemInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-list-item')
export class ListItemComponent extends AbstractComponent<ListItemInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ListItemComponent';

    @property()
    content: AbstractInputData[] = [];

    render() {
        return html`<div>
                        TODO:
                        <slot></slot>                           
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
        this.content = this.inputData.content;


    }

}
