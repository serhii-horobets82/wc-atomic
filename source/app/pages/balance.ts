import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextInputData} from "../../atoms/text/model";
import {DatalistInputData} from "../../atoms/datalist/model";
import {DatalistComponent} from "../../atoms/datalist/component";
import {TextComponent} from "../../atoms/text/component";
import {TextfieldInputData} from "../../atoms/textfield/model";
import {Button} from "../../atoms/button/model";


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
            columnKey: 'nummer'
        },
            <TableHeaderInputData>{
                componentInputData: <TextInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'bezeichnung'
            },
            <TableHeaderInputData>{
                componentInputData: <TextfieldInputData>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'saldo'
            },
            <TableHeaderInputData>{
                componentInputData: <DatalistInputData>{
                    componentIdentifier: DatalistComponent.IDENTIFIER,
                    dataListChannel: 'companies'
                },
                columnKey: 'dest_idl'
            },
            <TableHeaderInputData>{
                componentInputData: <Button>{componentIdentifier: TextComponent.IDENTIFIER},
                columnKey: 'status'
            }
        ]
    };

    getContent(): TemplateResult {

        return html`

<component-button text="Kreditoren"></component-button>
<component-button text="Debitoren"></component-button>

<component-table .inputData="${this.tableInputData}"></component-table>

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