import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {ColumnChangedEventData, TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {TextComponent} from "../../atoms/text/component";
import {InputInputData} from "../../input/input/model";
import {InputComponent} from "../../input/input/component";
import {baseHelper} from "../../util/base";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {getDefaultTemplateInputData} from "../app-showcase";
import {HTTP_CLIENT} from "../data/data";
import {AbstractBalcoPage} from "./abstract-balco-page";


@customElement('page-retification')
export class RetificationPage extends AbstractBalcoPage {

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
                 
             <component-flex-container gridClazz="grid_100 maxPadding" columnFlexBasisValue="100%">
          
                <component-table .inputData="${this.tableInputData}" @component-table-column-changed="${(event: CustomEvent) => {
            this.columnTableChangedEvent(event)
        }}"></component-table>
            
            </component-flex-container>

`;

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
        this.tableInputData.requestParams = 'typ=' + this.typ + '&idl='.concat(BALCO_DATA_STORE.getSelectedCompany().idl);
    }

    protected inputDataChanged(): void {
        super.inputDataChanged();
        this.tableInputData = <TableInputData>{
            componentIdentifier: TableComponent.IDENTIFIER,
            requestPath: '/RETIFICATION/RETIFICATION/BY_IDL',
            requestParams: 'typ=' + this.typ + '&idl='.concat(BALCO_DATA_STORE.getSelectedCompany().idl),
            page: 0,
            size: 10,
            sort: '',
            sorting: false,
            filtering: false,
            headers: [
                <TableHeaderInputData>{
                    componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                    columnKey: 'src_nummer',
                    searchValue: '', widthPercent: 10,
                },
                <TableHeaderInputData>{
                    componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                    columnKey: 'src_bezeichnung',
                    searchValue: '', widthPercent: 30,
                },
                <TableHeaderInputData>{
                    componentInputData: <InputInputData>{componentIdentifier: InputComponent.IDENTIFIER},
                    columnKey: 'src_saldo',
                    searchValue: '', widthPercent: 10,
                },
                <TableHeaderInputData>{
                    componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                    columnKey: 'dest_bezeichnung',
                    searchValue: '', widthPercent: 30,
                },
                <TableHeaderInputData>{
                    componentInputData: <InputInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                    columnKey: 'dest_saldo',
                    searchValue: '', widthPercent: 10,
                }
            ]
        };
    }

    private columnTableChangedEvent(event: CustomEvent) {
        let data = <ColumnChangedEventData>event.detail;

        let source: any = data.row.source;

        let newValueData = data.newValue.outputData.value;
        if (baseHelper.isBlank(newValueData)) {
            return;
        }
        let urlSuffix = '/RETIFICATION/UPDATE_SALDO/'.concat(source.src_id).concat('/').concat(newValueData);
        console.log('matching: ' + urlSuffix);
        let responsePromise = HTTP_CLIENT.post(urlSuffix, {});
        responsePromise.then(value => {
            console.log('matching/unmatching ok ? ' + value.status);
        })

    }

    private changeSaldo(event: CustomEvent): void {
        let data = event.detail;
        console.log(data);

    }
}