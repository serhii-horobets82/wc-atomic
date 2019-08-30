import {customElement} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {FlexContainer} from "../../interface/atoms";
import {FlexComponent} from "../../component/flex-container/flex-container";
import {NavigationComponent} from "../../component/navigation/navigation";
import {TemplateModel} from "../../abstract/template/model";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";


@customElement('page-media')
export class MediaPage extends DefaultTemplate {

    initTemplateData(): DefaultTemplateModel {
        let containerData = <FlexContainer>{
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