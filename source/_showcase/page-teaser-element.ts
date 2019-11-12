import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';

@customElement('page-component-input')
export class PageTeaserElementComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`TeaserElementComponent`;
}
}
