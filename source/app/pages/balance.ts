import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {DEFAULT_TEMPLATE_INPUT_DATA, HTTP_CLIENT} from "../data/data";
import {ColumnChangedEventData, TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {InputInputData} from "../../input/input/model";
import {ButtonInputData} from "../../atoms/button/model";
import {InputComponent} from "../../input/input/component";
import {ButtonComponent} from "../../atoms/button/component";
import {baseHelper} from "../../util/base";
import {BALCO_DATA_STORE} from "../data/balco_data";


@customElement('page-balance')
export class BalancePage extends DefaultTemplate {

    constructor() {
        super();
        this.inputData = DEFAULT_TEMPLATE_INPUT_DATA;
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

            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding">
            
                <component-button text="Debitoren" .selected="${this.debitorSelected}"  @click="${() => {
            this.changeTyp('D')
        }})"></component-button>
                
                <component-spacer clazz="minPaddingRight"></component-spacer>

                <component-button text="Kreditoren" .selected="${this.kreditorSelected}" @click="${() => {
            this.changeTyp('K')
        }})"></component-button>
                
                <component-spacer clazz="maxPadding"></component-spacer>
                
           
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
            size: 10,
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
                        componentIdentifier: InputComponent.IDENTIFIER,
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
                    componentInputData: <ButtonInputData>{componentIdentifier: ButtonComponent.IDENTIFIER},
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