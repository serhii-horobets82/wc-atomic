import {customElement, html, property, TemplateResult} from "lit-element";
import {DefaultTemplate} from "../../templates/default/template";
import {BalanceOverview, User} from "../data/data";
import {DEFAULT_TEMPLATE_INPUT_DATA} from "../app-showcase";
import {BALCO_DATA_STORE, BalcoDataChannels} from "../data/balco_data";
import {I18N} from "../../util/i18n-util";
import {baseHelper} from "../../util/base";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    constructor() {
        super();
        this.inputData = DEFAULT_TEMPLATE_INPUT_DATA;
        this.user = BALCO_DATA_STORE.getUser();
        this.uiRefreshChannels = [BalcoDataChannels.BALANCE_OVERVIEW_D, BalcoDataChannels.BALANCE_OVERVIEW_K];
    }

    getContent(): TemplateResult {
        let balanceOverviewD = baseHelper.getValue(BALCO_DATA_STORE.getBalanceOverview('D'), <BalanceOverview>{});
        let balanceOverviewK = baseHelper.getValue(BALCO_DATA_STORE.getBalanceOverview('K'), <BalanceOverview>{});
        return html`
            <component-flex-container gridClazz="grid_100 alignItemsCenter maxPadding" columnFlexBasisValue="50%" >
                <div>
                    <component-h2 text="${this.getI18NValue('balco_welcome_user_prefix')} ${BALCO_DATA_STORE.getUserString()}" subtext="${BALCO_DATA_STORE.getSelectedCompany().firmenname}"></component-h2>
                    <component-text text="${this.getI18NValue('balco_welcome_text')}"></component-text>
                </div>
                <div>
                    <component-teaser>
                        <component-teaser-element slot="content" selected="true">
                            <component-img slot="background" cssStyle="height:480px;" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL + 'info_gesellschaft.jpeg'}"></component-img>
                            <component-h3 slot="foreground" text="${I18N.getValue('header_teaser_mandant_content')}"></component-h3>
                            <compontent-text slot="foreground">${I18N.getValue('teaser_mandant_content')}</compontent-text>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:480px;" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL + 'info_import.jpeg'}"></component-img>                            <component-h3 slot="foreground" text="${I18N.getValue('header_teaser_import_content')}"></component-h3>
                            <compontent-text slot="foreground">${I18N.getValue('teaser_import_content')}</compontent-text>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:480px;" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL + 'info_ic_salden.jpeg'}"></component-img>                           <component-h3 slot="foreground" text="${I18N.getValue('header_teaser_ic_salden_content')}"></component-h3>
                            <compontent-text slot="foreground">${I18N.getValue('teaser_ic_salden_content')}</compontent-text>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:480px;" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL + 'info_kontenabstimmung.jpeg'}"></component-img>                           <component-h3 slot="foreground" text="${I18N.getValue('header_teaser_kontenabstimmung_mandant_content')}"></component-h3>
                            <compontent-text slot="foreground">${I18N.getValue('teaser_kontenabstimmung_mandant_content')}</compontent-text>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:480px;" src="${BALCO_DATA_STORE.IMG_RESOURCE_URL + 'info_salden_ok.jpeg'}"></component-img>                           <component-h3 slot="foreground" text="${I18N.getValue('header_teaser_saldenbeastaetigung_content')}"></component-h3>
                            <compontent-text slot="foreground">${I18N.getValue('teaser_saldenbeastaetigung_content')}</compontent-text>
                        </component-teaser-element>
                        <component-teaser-menu-element slot="menu" selected="true"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                    </component-teaser>
                </div>
               <div>
                <component-list>
                    <component-list-item>
                        <component-text text="${this.getI18NValue('balco_debitor')}"></component-text>
                    </component-list-item>
                    <component-list-item>
                        <component-text text="${I18N.getValue('saldo_importiert')}"></component-text>
                        <component-text text="${balanceOverviewD.saldoSumme}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_importierter_datensaetze')}"></component-text>
                        <component-text text="${balanceOverviewD.anzahlImportierteSalden}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_zu_bestaetigender_salden')}"></component-text>
                        <component-text text="${balanceOverviewD.anzahlZuBestaetigenderSalden}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_salden_in_konstenabstimmung')}"></component-text>
                        <component-text text="${balanceOverviewD.anzahlKontenInSaldenabstimmung}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_saldenbestaetigungen')}"></component-text>
                        <component-text text="${balanceOverviewD.anzahlSaldenbestaetigungen}"></component-text>
                    </component-list-item>
                </component-list>
                </div>
                <div>
                 <component-list>
                    <component-list-item>
                        <component-text text="${this.getI18NValue('balco_kreditor')}"></component-text>
                    </component-list-item>
                    <component-list-item>
                        <component-text text="${I18N.getValue('saldo_importiert')}"></component-text>
                        <component-text text="${balanceOverviewK.saldoSumme}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_importierter_datensaetze')}"></component-text>
                        <component-text text="${balanceOverviewK.anzahlImportierteSalden}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_zu_bestaetigender_salden')}"></component-text>
                        <component-text text="${balanceOverviewK.anzahlZuBestaetigenderSalden}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_salden_in_konstenabstimmung')}"></component-text>
                        <component-text text="${balanceOverviewK.anzahlKontenInSaldenabstimmung}"></component-text>
                    </component-list-item>
                     <component-list-item>
                        <component-text text="${I18N.getValue('anzahl_saldenbestaetigungen')}"></component-text>
                        <component-text text="${balanceOverviewK.anzahlSaldenbestaetigungen}"></component-text>
                    </component-list-item>
                  </component-list>
                </div>
           </component-flex-container>
        `;
    }

}