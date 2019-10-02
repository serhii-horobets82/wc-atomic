import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation, httpClient} from "../data/data";
import {ColumnChangedEventData, TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {DatalistInputData} from "../../input/datalist/model";
import {DatalistComponent} from "../../input/datalist/component";
import {TextComponent} from "../../atoms/text/component";
import {InputInputData} from "../../input/input/model";
import {Button} from "../../atoms/button/model";
import {InputComponent} from "../../input/input/component";
import {ButtonComponent} from "../../atoms/button/component";
import {baseHelper} from "../../util/base";


@customElement('page-retification')
export class RetificationPage extends DefaultTemplate {

    constructor() {
        super();
    }

    @property()
    tableInputData: TableInputData = <TableInputData>{
        componentIdentifier: TableComponent.IDENTIFIER,
        requestPath: '/MATCHING/RETIFICATION/BY_IDL/0680',
        page: 0,
        size: 10,
        sort: '',
        headers: [<TableHeaderInputData>{
            componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
            columnKey: 'src_idl',
            searchValue: ''
        },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'dest_idl',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'src_firmenname',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'dest_firmenname',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <InputInputData>{componentIdentifier: InputComponent.IDENTIFIER},
                columnKey: 'src_saldo',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'dest_saldo',
                searchValue: ''
            }
        ]
    };

    getContent(): TemplateResult {

        return html`

            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding">
            
                <component-button text="Kreditoren"></component-button>
                <component-button text="Debitoren"></component-button>
                <component-button text="Sachkonten"></component-button>
            
                <component-table .inputData="${this.tableInputData}" @component-table-column-changed="${(event: CustomEvent) => {
            this.columnTableChangedEvent(event)
        }}"></component-table>
            
            </component-flex-container>

`;

    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
            title: 'Component Overview',
            componentInputData: [],
        };
    }

    private columnTableChangedEvent(event: CustomEvent) {
        let data = <ColumnChangedEventData>event.detail;

        let source: any = data.row.source;

        let newValueData = data.newValue.value;
        let urlSuffix = baseHelper.isNotBlank(newValueData) ? '/MATCHING/MATCH/'.concat(source.id).concat('/').concat(newValueData) : '/MATCHING/UNMATCH/'.concat(source.id);
        console.log('matching: ' + urlSuffix);
        let responsePromise = httpClient.post(urlSuffix, {});
        responsePromise.then(value => {
            console.log('matching/unmatching ok ? ' + value.status);
        })

    }
}