import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';

@customElement('page-img')
export class PageImgComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        
         <component-flex-container gridClazz="grid_50">
         
            <component-img src="https://picsum.photos/300/300"></component-img>
            
            
         </component-flex-container>
        
`;
}
}
