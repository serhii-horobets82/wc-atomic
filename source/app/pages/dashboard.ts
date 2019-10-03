import {customElement, html, property, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {DATA_NAVIGATION, Konzern, SESSION_STORE, User} from "../data/data";
import {KeyValueOutputData} from "../../organisms/form/model";
import {BALCO_DATA_STORE} from "../data/balco_data";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    constructor() {
        super();
        this.user = BALCO_DATA_STORE.getUser();
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: DATA_NAVIGATION,
            title: 'Component Overview',
            componentInputData: [],
        };
    }

    getContent(): TemplateResult {
        return html`Herzlich Willkommen: ${this.user.vorname} ${this.user.name}
        
                <component-combobox .inputData="${BALCO_DATA_STORE.getMyCompaniesCID()}" @combobox-component-selection-change="${(event: CustomEvent) => this.ddd(event)}"></component-combobox>

${JSON.stringify(BALCO_DATA_STORE.getSelectedCompany())}


        
        `;
    }


    ddd(event: CustomEvent) {
        let data: KeyValueOutputData = event.detail;
        let selectedIDL: string = data.value;
        BALCO_DATA_STORE.setSelectedIDL(selectedIDL);
    }


}