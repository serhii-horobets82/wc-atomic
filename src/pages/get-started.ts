import {customElement} from "lit-element";
import {DefaultTemplate} from "../templates/default";
import {H} from "../interface/atoms";
import {H1Component} from "../component/h/h";
import {CodeComponent, Code} from "../component/code/code";
import {Page} from "../templates/abstract-page";


@customElement('page-get-started')
export class GetStartedPage extends DefaultTemplate {

    constructor() {
        super();

        let xxxx = <H>{
            componentIdentifier: H1Component.IDENTIFIER,
            headerText: 'Neue Anwendung',
        };


        let xxxxy = <Code>{
            componentIdentifier: CodeComponent.IDENTIFIER,
            code: '',
        };


        this.pageData = <Page>{
            title: 'Get started',
            componentInputData: [xxxx],
        };

    }


}