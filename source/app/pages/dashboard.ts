import {customElement, html, property, TemplateResult} from "lit-element";
import {TeaserComponent} from "../../molecules/teaser/component";
import {DefaultTemplate} from "../../templates/default/template";
import {User} from "../data/data";
import {DEFAULT_TEMPLATE_INPUT_DATA} from "../app-showcase";
import {BALCO_DATA_STORE} from "../data/balco_data";
import {ImgModel} from "../../atoms/img/model";
import {ImgComponent} from "../../atoms/img/component";
import {TextWithHeaderComponent} from "../../molecules/text-with-header/component";
import {TextComponent} from "../../atoms/text/component";
import {TextInputData} from "../../atoms/text/model";
import {I18N} from "../../util/i18n-util";
import {TeaserContainerInputData} from "../../molecules/teaser/model";
import {TeaserElementInputData} from "../../molecules/teaser/teaser-element/model";
import {TeaserElementComponent} from "../../molecules/teaser/teaser-element/component";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    @property()
    user: User = <User>{};

    @property()
    teaserInputData: TeaserContainerInputData = <TeaserContainerInputData>{
        componentIdentifier: TeaserComponent.IDENTIFIER,
        items: [
            <TeaserElementInputData>{
                componentIdentifier: TeaserElementComponent.IDENTIFIER,
                selected: true,
                backgroundContent: <ImgModel>{
                    componentIdentifier: ImgComponent.IDENTIFIER,
                    src: 'https://picsum.photos/900/500',
                    clazz: 'imageWidthHundred',
                    text: 'Mandant'
                },
                foregroundContent: <TextInputData>{
                    componentIdentifier: TextComponent.IDENTIFIER,
                    text: I18N.getValue('teaser_mandant_content'),
                }
            },
            <TeaserElementInputData>{
                componentIdentifier: TeaserElementComponent.IDENTIFIER,
                selected: true,
                backgroundContent: <ImgModel>{
                    componentIdentifier: ImgComponent.IDENTIFIER,
                    src: 'https://picsum.photos/900/480',
                    clazz: 'imageWidthHundred',
                    text: ''
                },
                foregroundContent: <TextInputData>{
                    componentIdentifier: TextComponent.IDENTIFIER,
                    text: I18N.getValue('teaser_import_content'),
                }
            },
            <TeaserElementInputData>{
                componentIdentifier: TeaserElementComponent.IDENTIFIER,
                selected: false,
                backgroundContent: <ImgModel>{
                    componentIdentifier: ImgComponent.IDENTIFIER,
                    src: 'https://picsum.photos/860/500',
                    clazz: 'imageWidthHundred',
                    text: ''
                },
                foregroundContent: <TextInputData>{
                    componentIdentifier: TextComponent.IDENTIFIER,
                    text: I18N.getValue('teaser_ic_salden_content'),
                }
            },
            <TeaserElementInputData>{
                componentIdentifier: TeaserElementComponent.IDENTIFIER,
                selected: false,
                backgroundContent: <ImgModel>{
                    componentIdentifier: ImgComponent.IDENTIFIER,
                    src: 'https://picsum.photos/860/500',
                    clazz: 'imageWidthHundred',
                    text: ''
                },
                foregroundContent: <TextInputData>{
                    componentIdentifier: TextComponent.IDENTIFIER,
                    text: I18N.getValue('teaser_kontenabstimmung_mandant_content'),
                }
            },
            <TeaserElementInputData>{
                componentIdentifier: TeaserElementComponent.IDENTIFIER,
                selected: false,
                backgroundContent: <ImgModel>{
                    componentIdentifier: ImgComponent.IDENTIFIER,
                    src: 'https://picsum.photos/860/500',
                    clazz: 'imageWidthHundred',
                    text: ''
                },
                foregroundContent: <TextInputData>{
                    componentIdentifier: TextComponent.IDENTIFIER,
                    text: I18N.getValue('teaser_saldenbeastaetigung_content'),
                }
            }
        ]
    };

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
                <component-teaser .inputData="${this.teaserInputData}"></component-teaser>
                </div>
                <div>
                
                <component-list>Meine Liste
                    <component-list-item>dddd</component-list-item>
                </component-list>
                
                </div>
                <div>
                TODO:
                </div>
            </component-flex-container>
        `;
    }

}