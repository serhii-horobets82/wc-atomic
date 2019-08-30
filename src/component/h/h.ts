import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../abstract/abstract-component";
import {H} from "../../interface/atoms";

const componentCSS = require('./h.scss');


export abstract class HComponent extends AbstractComponent<H, any> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'HComponent';

    @property()
    text: string;

    @property()
    subtext: string;

    @property()
    clazz: string;

    static create(headerType: number): HComponent {
        switch (headerType) {
            case 1:
                return new H1Component();
            case 2:
                return new H2Component();
            case 3:
                return new H3Component();
        }
        return new H1Component();
    }

    getDefaultInputData(): H {
        return <H>{
            headerType: 1,
            headerText: 'Meine Überschrift',
            subheaderText: 'Ein kleine Unterüberschrift',
            clazz: '',
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.clazz = this.inputData.clazz;
        this.text = this.inputData.headerText;
        this.subtext = this.inputData.subheaderText;
    }

}

@customElement('component-h1')
export class H1Component extends HComponent {

    static IDENTIFIER: string = 'H1Component';

    render() {
        return html`<div class="headerBox ${this.clazz}">
                        <h1 class="header">${this.text}</h1>
                        <h2 class="subheader">${this.subtext}</h2>
                    </div>`;
    }

}

@customElement('component-h2')
export class H2Component extends HComponent {

    static IDENTIFIER: string = 'H2Component';

    render() {
        return html`<div class="headerBox ${this.clazz}">
                        <h2 class="header">${this.text}</h2>
                        <h3 class="subheader">${this.subtext}</h3>
                    </div>`;
    }

}

@customElement('component-h3')
export class H3Component extends HComponent {

    static IDENTIFIER: string = 'H3Component';

    render() {
        return html`<div class="headerBox ${this.clazz}">
                        <h3 class="header">${this.text}</h3>
                        <h4 class="subheader">${this.subtext}</h4>
                    </div>`;
    }

}
