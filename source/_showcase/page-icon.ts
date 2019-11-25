import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';

@customElement('page-icon')
export class PageIconComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        based on: <component-link href="https://material.io/resources/icons/?style=baseline">Google Material Icons</component-link>
        
         <component-flex-container containerClazz="container_50">
         
            <component-icon iconClazz="fas fa-question"></component-icon>
            
            <component-icon-with-text iconClazz="fas fa-question" text="Mein Konto"></component-icon-with-text>
        
         </component-flex-container>
        
`;
}
}
