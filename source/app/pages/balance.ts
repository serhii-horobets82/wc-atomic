import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";

import {ColumnChangedEventData, TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {InputInputData} from "../../input/input/model";
import {baseHelper} from "../../util/base";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {getDefaultTemplateInputData} from "../app-showcase";
import {HTTP_CLIENT} from "../data/data";
import {IconComponent} from "../../atoms/icon/component";
import {IconInputData} from "../../atoms/icon/model";


@customElement('page-balance')
export class BalancePage extends DefaultTemplate {

    constructor() {
        super();
        this.inputData = getDefaultTemplateInputData();
    }

    @property()
    kreditorSelected: boolean = false;

    @property()
    debitorSelected: boolean = true;

    @property()
    typ: string = 'D';

    @property()
    tableInputData: TableInputData = <TableInputData>{};

    getContent(): TemplateResult {
        return html`

           <component-flex-container gridClazz="grid_100 maxPadding">

                <component-button text="${this.getI18NValue('balco_debitor')}" .selected="${this.debitorSelected}"  @click="${() => {
            this.changeTyp('D')
        }})"></component-button>
                
                <component-spacer clazz="minPaddingRight"></component-spacer>

                <component-button text="${this.getI18NValue('balco_kreditor')}" .selected="${this.kreditorSelected}" @click="${() => {
            this.changeTyp('K')
        }})"></component-button>
                    
         </component-flex-container>
         
         
         
         <component-icon iconClazz="fas fa-circle"></component-icon>Offen (grau)
         <component-icon iconClazz="fas fa-circle"></component-icon>Bereitgestellt (Gelb) 
         <component-icon iconClazz="fas fa-circle"></component-icon>Nicht bestätigt (rot)
         <component-icon iconClazz="fas fa-circle"></component-icon>Bestätigt (grün)
                 
             <component-flex-container gridClazz="grid_100 maxPadding" columnFlexBasisValue="100%">
          
                <component-table .inputData="${this.tableInputData}" @component-table-column-changed="${(event: CustomEvent) => {
            this.columnTableChangedEvent(event)
        }}"></component-table>
            
            </component-flex-container>
`;

    }

    protected inputDataChanged(): void {
        super.inputDataChanged();
        this.tableInputData = <TableInputData>{
            componentIdentifier: TableComponent.IDENTIFIER,
            requestPath: '/BALANCE/FIND',
            requestParams: 'typ=' + this.typ + '&src_idl='.concat(BALCO_DATA_STORE.getSelectedCompany().idl),
            page: 0,
            size: 5,
            sort: 'nummer:desc;',
            headers: [<TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'nummer',
                searchValue: '',
                widthPercent: 10,
            },
                <TableHeaderInputData>{
                    componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                    columnKey: 'bezeichnung',
                    searchValue: '',
                    widthPercent: 40,
                },
                <TableHeaderInputData>{
                    componentInputData: <InputInputData>{
                        componentIdentifier: TextComponent.IDENTIFIER,
                        type: 'number'
                    },
                    columnKey: 'saldo',
                    searchValue: '',
                    widthPercent: 10,
                },
                <TableHeaderInputData>{
                    componentInputData: BALCO_DATA_STORE.getCompaniesDLID(),
                    columnKey: 'dest_idl',
                    searchValue: '',
                    widthPercent: 30,
                },
                <TableHeaderInputData>{
                    componentInputData: <IconInputData>{
                        componentIdentifier: IconComponent.IDENTIFIER,
                        iconClazz: 'fas fa-circle'
                    },
                    columnKey: 'status',
                    searchValue: '',
                    widthPercent: 10,
                }
            ]
        };
    }

    private columnTableChangedEvent(event: CustomEvent) {
        let data = <ColumnChangedEventData>event.detail;

        let source: any = data.row.source;

        let newValueData = data.newValue.value;
        let urlSuffix = baseHelper.isNotBlank(newValueData) ? '/MATCHING/MATCH/'.concat(source.id).concat('/').concat(newValueData) : '/MATCHING/UNMATCH/'.concat(source.id);
        console.log('matching: ' + urlSuffix);
        let responsePromise = HTTP_CLIENT.post(urlSuffix, {});
        responsePromise.then(value => {
            console.log('matching/unmatching ok ? ' + value.status);
        })

    }

    private changeTyp(newTyp: string) {
        this.typ = newTyp;
        switch (newTyp) {
            case 'D':
                this.kreditorSelected = false;
                this.debitorSelected = true;
                break;
            case 'K':
                this.kreditorSelected = true;
                this.debitorSelected = false;
                break;
        }
        this.tableInputData.requestParams = 'typ=' + this.typ + '&src_idl='.concat(BALCO_DATA_STORE.getSelectedCompany().idl);
    }
}