import {css, property, query, TemplateResult, unsafeCSS, html} from 'lit-element';
import {DataProtection} from "../../molecules/data-protection/component";
import {DefaultTemplateInputData} from "./model";
import {IconInputData} from "../../atoms/icon/model";
import {baseHelper} from "../../index";
import {AbstractComponent} from "../../abstract/component/component";

const componentCSS = require('./template.css');

export abstract class DefaultTemplate extends AbstractComponent<DefaultTemplateInputData, any> {

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
    getDefaultInputData(): DefaultTemplateInputData {
        return <DefaultTemplateInputData>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            title:'',
        };
    }


    menuItemClicked(event: CustomEvent) {
        let iid: IconInputData = event.detail
        if (baseHelper.isEqual(iid.iconClazz, this.menuSwitchIconClazz)) {
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

