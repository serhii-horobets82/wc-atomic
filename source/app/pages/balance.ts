import {customElement, html, property, TemplateResult} from 'lit-element';
import {TableComponent} from "../../organisms/table/component";

import {ColumnChangedEventData, TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {InputInputData} from "../../input/input/model";
import {baseHelper, UI_REFRESHER} from "../../index";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {getDefaultTemplateInputData} from "../app-showcase";
import {HTTP_CLIENT} from "../data/data";
import {IconComponent} from "../../atoms/icon/component";
import {IconInputData} from "../../atoms/icon/model";
import {AbstractBalcoPage} from "./abstract-balco-page";
import {KeyValueData} from "../../organisms/form/model";


@customElement('page-balance')
export class BalancePage extends AbstractBalcoPage {

    static DATALIST_CHANGE_CHANNEL: string = 'DATALIST_CHANGE_CHANNEL';

    constructor() {
        super();
        this.inputData = getDefaultTemplateInputData();
        this.uiRefreshChannels = [BalancePage.DATALIST_CHANGE_CHANNEL];
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
         
         
         <component-toolbar>
             <component-spacer slot="leftComponents" clazz="maxPaddingLeft"></component-spacer>
             <component-icon slot="leftComponents" iconClazz="fas fa-circle"></component-icon>
             <component-text slot="leftComponents">&nbsp;${this.getI18NValue('balco_status_open')}&nbsp;</component-text>
             <component-icon slot="leftComponents" iconClazz="fas fa-circle warning"></component-icon>
             <component-text slot="leftComponents">&nbsp;${this.getI18NValue('balco_status_ready')}&nbsp;</component-text> 
             <component-icon slot="leftComponents" iconClazz="fas fa-circle error"></component-icon>
             <component-text slot="leftComponents">&nbsp;${this.getI18NValue('balco_status_not_accepted')}&nbsp;</component-text>
             <component-icon slot="leftComponents" iconClazz="fas fa-circle success"></component-icon>
             <component-text slot="leftComponents">&nbsp;${this.getI18NValue('balco_status_matched')}&nbsp;</component-text>
         </component-toolbar>
                 
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
                    columnKey: 'statusColor',
                    valueProperty: <KeyValueData>{key: 'iconClazz', value: 'statusColor'},
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
            UI_REFRESHER.informListener(BalancePage.DATALIST_CHANGE_CHANNEL);
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