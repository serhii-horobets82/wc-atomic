import {customElement, html, property, TemplateResult} from "lit-element";
import {TeaserComponent} from "../../molecules/teaser/component";
import {DefaultTemplate} from "../../templates/default/template";
import {User} from "../data/data";
import {DEFAULT_TEMPLATE_INPUT_DATA} from "../app-showcase";
import {BALCO_DATA_STORE} from "../data/balco_data";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    constructor() {
        super();
        this.inputData = DEFAULT_TEMPLATE_INPUT_DATA;
        this.user = BALCO_DATA_STORE.getUser();
    }

    getContent(): TemplateResult {
        return html`
            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding" columnFlexBasisValue="50%" >
                <div>
                    <component-h2 text="${this.getI18NValue('balco_welcome_user_prefix')} ${BALCO_DATA_STORE.getUserString()}" subtext="${BALCO_DATA_STORE.getSelectedCompany().firmenname}"></component-h2>
                    <component-text text="${this.getI18NValue('balco_welcome_text')}"></component-text>
                </div>
                <div>
                <component-teaser .inputData="${new TeaserComponent().getDefaultInputData()}"></component-teaser>
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

}