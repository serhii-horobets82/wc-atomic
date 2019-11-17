import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';

@customElement('page-list-item')
export class PageListItemComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`ListItemComponentxx
<component-list-item></component-list-item>
`;
}
}
