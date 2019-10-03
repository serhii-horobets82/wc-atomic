import {customElement, html, property, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {DefaultTemplateModel} from "../../templates/default/model";
import {DATA_NAVIGATION, User} from "../data/data";
import {sessionStore} from "../../util/storage/storage";

@customElement('page-import')
export class ImportPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    constructor() {
        super();
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
        return html`Import 

Hinweis:
 
<component-text text="Importiere hier nun jeweils eine Debitoren- und eine Kreditorensaldenliste im CSV-Format. Der Aufbau der Datei muss wie in der Beispieldatei sein. Du  kannst den Import beliebig oft wiederholen. "></component-text>


<component-inputfield type="file"></component-inputfield>`;
    }

}