import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {TableHeaderInputData} from "../table/component";
import {TypographyComponent, TypographyInputData} from "../typography/component";

@customElement('page-table')
export class PageTableComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        
         <component-flex-container gridClazz="grid_100">
         
            <component-table requestPath="/AUTHUSER/FIND" .headers="${[<TableHeaderInputData>{
            componentInputData: <TypographyInputData>{componentIdentifier: TypographyComponent.IDENTIFIER},
            columnKey: 'firstName',
            searchValue: '',
        }]}"></component-table>
            
           
        
         </component-flex-container>
        
`;
    }
}
