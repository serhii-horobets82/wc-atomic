import {DefaultTemplate} from "../../templates/default/template";
import {Accordion, AccordionItem, FlexContainer} from "../../interface/atoms";
import {FlexComponent} from "../../component/flex-container/flex-container";
import {AccordionComponent} from "../../component/accordion/accordion";
import {TileComponent} from "../../component/tile/tile";
import {TeaserComponent} from "../../component/teaser/teaser";
import {H1Component} from "../../component/h/h";
import {TextfieldComponent} from "../../component/textfield/textfield";
import {DateComponent} from "../../component/date/date";
import {TextareaComponent} from "../../component/textarea/textarea";
import {IconComponent} from "../../component/icon/icon";
import {ImgComponent} from "../../atoms/img/component";
import {ComboboxComponent} from "../../component/combobox/combobox";
import {ColorComponent} from "../../component/color/color";
import {CodeComponent} from "../../component/code/code";
import {CheckboxComponent} from "../../component/checkbox/checkbox";
import {ButtonComponent} from "../../component/button/button";
import {LinkComponent} from "../../component/link/link";
import {TextComponent} from "../../component/text/text";
import {ComponentViewerComponent, LeafViewer} from "../../component/component-viewer/component-viewer";
import {ComponentLoader} from "../../abstract/component-loader";
import {customElement} from "lit-element";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {NavigationComponent} from "../../component/navigation/navigation";
import {data_navigation} from "../data/data";


@customElement('page-input-data')
export class ComponentPage extends DefaultTemplate {

    initTemplateData(): DefaultTemplateModel {
        let containerData: FlexContainer = <FlexContainer>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_100',
            columnFlexBasisValue: '100%',
            componentsInputData: [<Accordion>{
                componentIdentifier: AccordionComponent.IDENTIFIER,
                items: [
                    this.createComponentViewerInputData(TileComponent.IDENTIFIER),
                    this.createComponentViewerInputData(TeaserComponent.IDENTIFIER),
                    this.createComponentViewerInputData(H1Component.IDENTIFIER),
                    this.createComponentViewerInputData(TextfieldComponent.IDENTIFIER),
                    this.createComponentViewerInputData(DateComponent.IDENTIFIER),
                    this.createComponentViewerInputData(TextareaComponent.IDENTIFIER),
                    this.createComponentViewerInputData(IconComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ImgComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ComboboxComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ColorComponent.IDENTIFIER),
                    this.createComponentViewerInputData(CodeComponent.IDENTIFIER),
                    this.createComponentViewerInputData(CheckboxComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ButtonComponent.IDENTIFIER),
                    this.createComponentViewerInputData(LinkComponent.IDENTIFIER),
                    this.createComponentViewerInputData(TextComponent.IDENTIFIER),
                ]
            }],
        };

        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
            title: 'Component Overview',
            componentInputData: [containerData],
        };
    }

    constructor() {
        super();
    }

    createComponentViewerInputData(identifier: string): AccordionItem {
        let accordionItem = <AccordionItem>{
            header: identifier,
            componentData: <LeafViewer>{
                componentIdentifier: ComponentViewerComponent.IDENTIFIER,
                component: ComponentLoader.INSTANCE.createComponent(identifier),
            },
            stateClazz: "closed"
        }
        return accordionItem;
    }

}