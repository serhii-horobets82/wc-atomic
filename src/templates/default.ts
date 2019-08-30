import {css, html, property, query, unsafeCSS} from 'lit-element';
import {NavigationComponent} from "../component/navigation/navigation";
import {AbstractPage} from "./abstract-page";
import {DataProtection} from "../component/data-protection/data-protection";
import {Navigation} from "../interface/atoms";
import {ToolbarComponent} from "../component/toolbar/toolbar";

const componentCSS = require('./default.scss');

export class DefaultTemplate extends AbstractPage {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DefaultTemplate';

    @property()
    title = 'HTML Template';

    @property()
    linkItems: Navigation;

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
            <component-navigation .inputData="${new NavigationComponent().getDefaultInputData()}" title="${this.title}"></component-navigation>
        </div>
        <div id="main">
            ${this.getContent()}
        </div>
    </div>
    <component-data-protection .inputData="${new DataProtection().getDefaultInputData()}"></component-data-protection>
    `;
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
