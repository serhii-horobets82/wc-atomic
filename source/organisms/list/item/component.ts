import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../../abstract/component/component';
import {ComponentLoader} from '../../../abstract/component-loader';
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
    content: AbstractInputData = <AbstractInputData>{};

    render() {
        return html`<div>
                        ${ComponentLoader.INSTANCE.createComponentFromInputData(this.content)}
                        <slot></slot>                           
                    </div>
      `;
    }

    getDefaultInputData(): ListItemInputData {
        return <ListItemInputData>{
            componentIdentifier: ListItemComponent.IDENTIFIER,
            content: <AbstractInputData>{},
        };
    }

    getOutputData(): any {
        return {};
    }

    protected inputDataChanged() {

    }

}
