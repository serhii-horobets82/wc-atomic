import {customElement} from 'lit-element';
import {DefaultTemplate} from "../templates/default";
import {FlexContainer} from "../interface/atoms";
import {FlexComponent} from "../component/flex-container/flex-container";
import {NavigationComponent} from "../component/navigation/navigation";
import {Page} from "../templates/abstract-page";


@customElement('page-media')
export class MediaPage extends DefaultTemplate {

    constructor() {
        super();

        let containerData = <FlexContainer>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_100',
            columnFlexBasisValue: '100%',
            componentsInputData: [new NavigationComponent().getDefaultInputData()],
        };

        this.pageData = <Page>{
            title: 'Media',
            componentInputData: [containerData],
        };

    }
}