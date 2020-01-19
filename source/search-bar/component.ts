import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ComponentLoader} from '../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {FlexJustifyContent} from "..";

const componentCSS = require('./component.css');

export class SearchBarInputData extends AbstractInputData {
    componentsInputData: AbstractInputData[] = [];
}

@customElement('component-search-bar')
export class SearchBarComponent extends AbstractComponent<SearchBarInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'SearchBarComponent';

    @property()
    componentsInputData: AbstractInputData[] = [];

    @property()
    flexJustifyContent: FlexJustifyContent = FlexJustifyContent.SPACE_AROUND;

    constructor() {
        super();
    }

    render() {
        return html`
         <div class="search-bar" style="justify-content: ${this.flexJustifyContent};">           
               ${guard(
            this.componentsInputData,
            () =>
                html`
                        ${repeat(
                    this.componentsInputData,
                    (inputData) => html`
                              ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                           `
                )}
                     `
        )}
               <slot></slot>
         </div>
      `;
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.componentsInputData = this.basicService.getValue(this.inputData.componentsInputData, []);
    }
}
