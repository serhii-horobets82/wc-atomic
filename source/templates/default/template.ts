import {css, html, property, query, unsafeCSS} from 'lit-element';
import {NavigationComponent} from "../../atoms/navigation/component";
import {Template} from "../../abstract/template/template";
import {DataProtection} from "../../molecules/data-protection/component";
import {DefaultTemplateModel} from "./model";
import {NavigationInputData} from "../../atoms/navigation/model";
import {ToolbarInputData} from "../../organisms/toolbar/model";
import {IconInputData} from "../../atoms/icon/model";
import {baseHelper} from "../../util/base";

const componentCSS = require('./template.css');

export abstract class DefaultTemplate extends Template<DefaultTemplateModel, any> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DefaultTemplate';

    @property()
    title = 'HTML Template';

    @property()
    menuSwitchIconClazz = 'fas fa-bars';

    @property()
    navigationInputData: NavigationInputData | undefined;

    @property()
    toolbarInputData: ToolbarInputData | undefined;

    @query("#header")
    private headerElement: HTMLElement | undefined;
    @query("#menu")
    private menuElement: HTMLElement | undefined;
    @query("#main")
    private mainElement: HTMLElement | undefined;

    menuCss: string = '';

    render() {
        return html`
     <div class="container" @component-icon-click="${this.menuItemClicked}">
        <header id="header">
            <component-toolbar .inputData="${this.toolbarInputData}"></component-toolbar>
        </header>
        <div id="menu">
            <component-navigation .inputData="${this.navigationInputData}" title="${this.title}"></component-navigation>
        </div>
        <div id="main">
            ${this.getContent()}
        </div>
    </div>
    <component-data-protection .inputData="${new DataProtection().getDefaultInputData()}"></component-data-protection>
    `;
    }

    public getOutputData(): any {
        return {};
    }

    protected inputDataChanged(): void {
        this.navigationInputData = this.inputData.navigationInputData;
        this.toolbarInputData = this.inputData.toolbarInputData;
    }

    getDefaultInputData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigationInputData: new NavigationComponent().getDefaultInputData(),
        };
    }


    menuItemClicked(event: CustomEvent) {
        let iid: IconInputData = event.detail
        if (baseHelper.isEqual(iid.iconClazz, this.menuSwitchIconClazz)) {
            console.log('menuItemClicked...');
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

}
