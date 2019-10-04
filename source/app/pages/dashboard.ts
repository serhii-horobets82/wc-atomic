import {customElement, html, property, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {DEFAULT_TEMPLATE_INPUT_DATA, User} from "../data/data";
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
        return DEFAULT_TEMPLATE_INPUT_DATA;
    }

    getContent(): TemplateResult {
        return html`
            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding" columnFlexBasisValue="50%" >
                <div>
                    <component-h2 text="Hallo Herr ${BALCO_DATA_STORE.getUserString()}" subtext="${BALCO_DATA_STORE.getSelectedCompany().firmenname}"></component-h2>
                    <component-text text="Herzlich Willkommen zur jährlichen Saldenabstimmung der Rethmann-Gruppe."></component-text>
                    <component-text text="Für einen reibungslosen Ablauf der Saldenabstimmung beachte bitte nebenstehenden Ablauf."></component-text>
                    <component-text text="Anwendungsunterstützung findest du auch unter dem Schnellstart-Guide"></component-text>
                    <component-text text="Viel Erfolg"></component-text>
                </div>
                <div>
                TODO:
                </div>
                <div>
                TODO:
                </div>
                <div>
                TODO:
                </div>
            </component-flex-container>
        `;
    }


    ddd(event: CustomEvent) {
        let data: KeyValueOutputData = event.detail;
        let selectedIDL: string = data.value;
        BALCO_DATA_STORE.setSelectedIDL(selectedIDL);
    }


}