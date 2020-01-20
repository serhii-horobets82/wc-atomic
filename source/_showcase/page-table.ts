import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputfieldType, InputfieldComponent, InputfieldInputData} from '../inputfield/component';
import {TableHeaderInputData} from "../table/component";
import {TypographyComponent, TypographyInputData} from "../typography/component";

@customElement('page-table')
export class PageTableComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        
         <component-flex-container containerClazz="container_100">
         
            <component-table requestPath="/AUTHUSER/FIND" .headers="${[<TableHeaderInputData>{
            componentInputData: <TypographyInputData>{componentIdentifier: TypographyComponent.IDENTIFIER},
            columnKey: 'firstName',
            searchValue: '',
        }, <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{componentIdentifier: TypographyComponent.IDENTIFIER},
            columnKey: 'lastName',
            searchValue: '',
        }, <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{componentIdentifier: TypographyComponent.IDENTIFIER},
            columnKey: 'email',
            searchValue: '',
        }, <TableHeaderInputData>{
            componentInputData: <InputfieldInputData>{
                componentIdentifier: InputfieldComponent.IDENTIFIER,
                inputfieldType: InputfieldType.CHECKBOX
            },
            columnKey: 'active',
            searchValue: '',
        }]}"></component-table>
            
           
        
         </component-flex-container>
        
`;
    }
}
