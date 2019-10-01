import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {DatalistInputData} from "../../input/datalist/model";
import {DatalistComponent} from "../../input/datalist/component";
import {TextComponent} from "../../atoms/text/component";
import {TextfieldInputData} from "../../input/input/model";
import {Button} from "../../atoms/button/model";
import {InputComponent} from "../../input/input/component";
import {ButtonComponent} from "../../atoms/button/component";


@customElement('page-balance')
export class BalancePage extends DefaultTemplate {

    constructor() {
        super();
    }

    @property()
    tableInputData: TableInputData = <TableInputData>{
        componentIdentifier: TableComponent.IDENTIFIER,
        page: 0,
        size: 10,
        sort: 'nummer:desc;',
        headers: [<TableHeaderInputData>{
            componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
            columnKey: 'nummer',
            searchValue: ''
        },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'bezeichnung',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <TextfieldInputData>{
                    componentIdentifier: InputComponent.IDENTIFIER,
                    type: 'number'
                },
                columnKey: 'saldo',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <DatalistInputData>{
                    componentIdentifier: DatalistComponent.IDENTIFIER,
                    dataListChannel: 'companies'
                },
                columnKey: 'dest_idl',
                searchValue: ''
            },
            <TableHeaderInputData>{
                componentInputData: <Button>{componentIdentifier: ButtonComponent.IDENTIFIER},
                columnKey: 'status',
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
            
                <component-table .inputData="${this.tableInputData}"></component-table>
            
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

}