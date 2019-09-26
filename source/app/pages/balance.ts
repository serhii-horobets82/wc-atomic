import {customElement, html, property, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {TableComponent} from "../../organisms/table/component";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {TableHeaderInputData, TableInputData} from "../../organisms/table/model";
import {TextfieldComponent} from "../../atoms/textfield/component";
import {TextComponent} from "../../atoms/text/component";
import {ComboboxComponent} from "../../atoms/combobox/component";
import {DatalistComponent} from "../../atoms/datalist/component";
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
        headers: [<TableHeaderInputData>{columnIdentifier: TextComponent.IDENTIFIER, columnKey: 'nummer'},
            <TableHeaderInputData>{columnIdentifier: TextComponent.IDENTIFIER, columnKey: 'bezeichnung'},
            <TableHeaderInputData>{columnIdentifier: TextfieldComponent.IDENTIFIER, columnKey: 'saldo'},
            <TableHeaderInputData>{columnIdentifier: DatalistComponent.IDENTIFIER, columnKey: 'dest_idl'},
            <TableHeaderInputData>{columnIdentifier: ButtonComponent.IDENTIFIER, columnKey: 'bestaetigen'},
            <TableHeaderInputData>{columnIdentifier: ButtonComponent.IDENTIFIER, columnKey: 'status'}]
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