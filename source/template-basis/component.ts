import {css, html, property, query, TemplateResult, unsafeCSS} from 'lit-element';
import {DataProtection} from "../molecules/data-protection/component";

import {AbstractComponent, AbstractInputData} from "../abstract-component/component";
import {IconInputData} from "../icon/component";

const componentCSS = require('./component.css');

export interface BasisTemplateInputData extends AbstractInputData {
    title: string;
}

export abstract class BasisTemplate extends AbstractComponent<BasisTemplateInputData, any> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DefaultTemplate';

    @property()
    title = '';

    @property()
    menuSwitchIconClazz = 'fas fa-bars';

    @query("#header")
    private headerElement: HTMLElement | undefined;
    @query("#menu")
    private menuElement: HTMLElement | undefined;
    @query("#main")
    private mainElement: HTMLElement | undefined;

    menuCss: string = '';

    render() {
        return html`
     <div class="container" @component-icon-click="${this.menuItemClicked}" >
        <header id="header">
            ${this.getTopContent()}
        </header>
        <div id="menu">
            ${this.getLeftComponent()}
        </div>
        <div id="main">
            ${this.getMainComponent()}
        </div>
    </div>
    <component-data-protection .inputData="${new DataProtection().getDefaultInputData()}"></component-data-protection>
    `;
    }

    abstract getMainComponent(): TemplateResult;

    abstract getLeftComponent(): TemplateResult;

    abstract getTopContent(): TemplateResult;

    protected inputDataChanged(): void {
        this.title = this.inputData.title;
    }

    public getOutputData(): any {
        return {};
    }

    getDefaultInputData(): BasisTemplateInputData {
        return <BasisTemplateInputData>{
            componentIdentifier: BasisTemplate.IDENTIFIER,
            title:'',
        };
    }


    menuItemClicked(event: CustomEvent) {
        let iid: IconInputData = event.detail
        if (this.basicService.isEqual(iid.iconClazz, this.menuSwitchIconClazz)) {
            console.log('menuItemClicked...');
           this.toogleMenu();
        }
    }

    private toogleMenu() {
        if (this.menuCss.length == 0) {
            this.menuCss = 'menuClosed';
        } else {
            this.menuCss = '';
        }

        if (this.menuElement != undefined)
            this.menuElement.setAttribute('class', this.menuCss);
        if (this.mainElement != undefined)
            this.mainElement.setAttribute('class', this.menuCss);
        if (this.headerElement != undefined)
            this.headerElement.setAttribute('class', this.menuCss);
    }

}

