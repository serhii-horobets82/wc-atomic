import {customElement} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {FlexComponent} from "../../organisms/flex-container/component";
import {NavigationComponent} from "../../atoms/navigation/component";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {FlexContainerInputData} from "../../organisms/flex-container/model";


@customElement('page-media')
export class MediaPage extends DefaultTemplate {

    initTemplateData(): DefaultTemplateModel {
        let containerData = <FlexContainerInputData>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_100',
            columnFlexBasisValue: '100%',
            componentsInputData: [new NavigationComponent().getDefaultInputData()],
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
}