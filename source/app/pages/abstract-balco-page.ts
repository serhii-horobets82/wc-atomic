import {DefaultTemplate} from "../../templates/default/template";
import {html, TemplateResult} from "lit-html";
import {NavigationInputData} from "../../atoms/navigation/model";
import {NavigationComponent} from "../../atoms/navigation/component";
import {I18N} from "../../util/i18n-util";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {ComponentLoader} from "../../abstract/component-loader";
import {I18NInputData} from "../../molecules/i18n-selector/model";
import {I18NSelectorComponent} from "../../molecules/i18n-selector/component";
import {KeyValueData} from "../../organisms/form/model";


export function getNAV(): NavigationInputData {
    return <NavigationInputData>{
        componentIdentifier: NavigationComponent.IDENTIFIER,
        links: [
            {text: I18N.getValue('balco_dashboard_page'), href: '#dashboard', icon: 'fas fa-tasks'},
            {text: I18N.getValue('balco_import_page'), href: '#import', icon: 'fas fa-file-import'},
            {text: I18N.getValue('balco_balance_page'), href: '#balance', icon: 'fas fa-sync-alt'},
            {text: I18N.getValue('balco_retification_page'), href: '#retification', icon: 'fas fa-balance-scale-right'},
            {text: I18N.getValue('balco_matching_page'), href: '#matching', icon: 'fas fa-check-double'},
        ],
    };
}


export class AbstractBalcoPage extends DefaultTemplate {

    getMenuComponent(): TemplateResult {
        let i18NInputData: I18NInputData = <I18NInputData>{
            componentIdentifier: I18NSelectorComponent.IDENTIFIER,
            languages: [<KeyValueData>{key: 'de-DE', value: 'Deutsch'}, <KeyValueData>{
                key: 'en-EN',
                value: 'English'
            }]
        };
        return html`


            <component-navigation clazz="primaryColor" .inputData="${getNAV()}">
            
                <component-spacer clazz="minPaddingLeft minPaddingTop minPaddingRight" slot="contentBefore">
                    <component-img clazz="" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL}Logo_REMONDIS_250.jpg"></component-img>
                </component-spacer>

                <component-spacer clazz="minPaddingLeft minPaddingRight" slot="contentBefore">
                <component-text><b>${BALCO_DATA_STORE.getUserString()}</b></component-text>
                </component-spacer>
            
                <component-spacer clazz="minPaddingLeft minPaddingRight" slot="contentBefore">
                    ${I18N.getValue('balco_company')}
                </component-spacer>
            
                <component-spacer clazz="minPadding" slot="contentBefore">
                    ${ComponentLoader.INSTANCE.createComponentFromInputData(BALCO_DATA_STORE.getMyCompaniesCID())}
                </component-spacer>


                <component-spacer clazz="minPadding" slot="contentAfter">
                    ${ComponentLoader.INSTANCE.createComponentFromInputData(i18NInputData)}
                </component-spacer>



        }



            </component-navigation>

`;
    }

}