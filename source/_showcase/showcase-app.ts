import {customElement, html, TemplateResult} from 'lit-element';
import {AbstractApp} from '../abstract-component/component';
import {RouterService} from '@domoskanonos/frontend-basis';
import {I18nService} from "@domoskanonos/frontend-basis/source/i18n-service";
import messageDE from './message-de.json';
import messageEN from './message-en.json';
import messageDEUser from './message-user-de.json';

import './page-introduction';
import './page-get-started';
import './page-input.ts';
import './page-bars.ts';
import './page-primary-title.ts';
import './page-layout.ts';
import './page-icon.ts';
import './page-card.ts';
import './page-cc.ts';
import './page-element-list';
import './page-table.ts';
import './page-img.ts';
import './page-form.ts';
import './page-typography.ts';
import './showcase-app.ts';

import {
    HttpClientService,
} from "@domoskanonos/frontend-basis/source/http-client-service";
import {PageLogin} from "./page-login";
import {PageRegister} from "./page-register";
import {PageChangePassword} from "./change-password";
import {PageSettings} from "./page-settings";
import {PageUsers} from "./page-users";
import {PageUser} from "./page-user";



@customElement('app-root')
export class ShowcaseApp extends AbstractApp {

    async preRender(): Promise<void> {
        I18nService.getInstance().saveData(messageDE);
        I18nService.getInstance().saveData(messageEN, 'en-EN');

        I18nService.getInstance().addData(messageDEUser);
        I18nService.getInstance().addData(messageEN, 'en-EN');

        let config = HttpClientService.getInstance().config;
        config.baseURL = 'http://v220190910399797452.supersrv.de:8099';

        return super.preRender();
    }

   renderPage(): TemplateResult {
      let path = RouterService.getInstance().getCurrentPage();
      console.log('current path: '.concat(path));
       switch (path) {
           case 'login':
           case 'logout':
               return html`
               ${new PageLogin()}
            `;
           case 'register':
               return html`
               ${new PageRegister()}
            `;
           case 'changepassword':
               return html`
               ${new PageChangePassword()}
            `;
           case 'settings':
               return html`
               ${new PageSettings()}
            `;
           case 'users':
               return html`
               ${new PageUsers()}
            `;
           case 'useredit':
               return html`
               ${new PageUser()}
            `;
           case 'pageicon':
               return html`<page-icon></page-icon>`;
           case 'pagecard':
               return html`<page-card></page-card>`;
           case 'pageprimarytitle':
               return html`<page-primary-title></page-primary-title>`;
           case 'pagetable':
               return html`<page-table></page-table>`;
           case 'pageimg':
               return html`<page-img></page-img>`;
          case 'pageelementlist':
              return html`<page-element-list></page-element-list>`;
          case 'pageinput':
              return html`<page-inputfield></page-inputfield>`;
          case 'pagetypography':
              return html`<page-typography></page-typography>`;
          case 'pagebars':
              return html`<page-bars></page-bars>`;
          case 'pagelayout':
              return html`<page-layout></page-layout>`;
          case 'pageform':
              return html`<page-form></page-form>`;
          case 'pagecc':
              return html`<page-cc></page-cc>`;
          case 'getStarted':
              return html`<page-get-started></page-get-started>`;
          case '':
          case 'dashboard':
          default:
              return html`<page-introduction></page-introduction>`;
      }
   }

    getAppTitle(): string {
        return "WC-Atomic Template";
    }
}