import {css, html, property, query, unsafeCSS} from 'lit-element';
import {NavigationComponent} from "../../component/navigation/navigation";
import {Template} from "../base/template";
import {DataProtection} from "../../component/data-protection/data-protection";
import {Navigation} from "../../interface/atoms";
import {ToolbarComponent} from "../../component/toolbar/toolbar";
import {DefaultTemplateModel} from "./model";
import {data_navigation} from "../../app/data/data";

const componentCSS = require('./template.css');

export abstract class DefaultTemplate extends Template<DefaultTemplateModel, any> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DefaultTemplate';

    @property()
    title = 'HTML Template';

    @property()
    navigation: Navigation;

    @query("#header")
    private headerElement: HTMLElement;
    @query("#menu")
    private menuElement: HTMLElement;
    @query("#main")
    private mainElement: HTMLElement;

    menuCss: string = '';

    render() {
        return html`
     <div class="container" @menuItemClicked="${this.menuItemClicked}">
        <header id="header">
            <component-toolbar .inputData="${new ToolbarComponent().getDefaultInputData()}"></component-toolbar>
        </header>
        <div id="menu">
            <component-navigation .inputData="${this.navigation}" title="${this.title}"></component-navigation>
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
        super.inputDataChanged();
        this.navigation = this.inputData.navigation;
    }

    getDefaultInputData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: new NavigationComponent().getDefaultInputData(),
        };
    }


    menuItemClicked(event: CustomEvent) {
        console.log('menuItemClicked...');
        if (this.menuCss.length == 0) {
            this.menuCss = 'menuClosed';
        } else {
            this.menuCss = '';
        }
        this.menuElement.setAttribute('class', this.menuCss);
        this.mainElement.setAttribute('class', this.menuCss);
        this.headerElement.setAttribute('class', this.menuCss);
    }

}
