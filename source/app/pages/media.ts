import {customElement} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {AbstractBalcoPage} from "./abstract-balco-page";


@customElement('page-media')
export class MediaPage extends AbstractBalcoPage {

    constructor() {
        super();
    }
}