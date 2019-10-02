import {customElement, html, property, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation, User} from "../data/data";
import {sessionStore} from "../../util/storage/storage";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    constructor() {
        super();
        let data: User | null = sessionStore.getData('user');
        if (data !== null && data !== undefined) {
            this.user = data;
        }
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
            title: 'Component Overview',
            componentInputData: [],
        };
    }

    getContent(): TemplateResult {
        return html`Herzlich Willkommen: ${this.user.vorname} ${this.user.name}`;
    }

}