import {DefaultTemplate} from "../templates/default";
import {Accordion, AccordionItem, FlexContainer} from "../interface/atoms";
import {FlexComponent} from "../component/flex-container/flex-container";
import {AccordionComponent} from "../component/accordion/accordion";
import {TableComponent} from "../component/table/table";
import {ImgSliderSelectorComponent} from "../component/img-slider-selector/img-slider-selector";
import {ImgSliderComponent} from "../component/img-slider/img-slider";
import {Page} from "../templates/abstract-page";
import {ComponentViewerComponent, LeafViewer} from "../component/component-viewer/component-viewer";
import {ComponentLoader} from "../component/abstract/component-loader";
import {customElement} from "lit-element";


@customElement('page-compound-component')
export class CompoundComponentPage extends DefaultTemplate {

    constructor() {
        super();

        let containerData: FlexContainer = <FlexContainer>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_75',
            columnFlexBasisValue: '100%',
            componentsInputData: [<Accordion>{
                componentIdentifier: AccordionComponent.IDENTIFIER,
                items: [
                    this.createComponentViewerInputData(TableComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ImgSliderSelectorComponent.IDENTIFIER),
                    this.createComponentViewerInputData(ImgSliderComponent.IDENTIFIER),
                ]
            }],
        };

        this.pageData = <Page>{
            title: 'Component Overview',
            componentInputData: [containerData],
        };

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