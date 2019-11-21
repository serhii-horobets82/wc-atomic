import {customElement, html, TemplateResult} from 'lit-element';
import {AbstractApp} from '../abstract-component/component';
import {RouterService} from '@domoskanonos/frontend-basis';
import {I18nService} from "@domoskanonos/frontend-basis/source/i18n-service";
import messageDE from './message-de.json';
import messageEN from './message-en.json';

import './page-introduction';
import './page-get-started';
import './page-input.ts';
import './page-menubar.ts';
import './page-primary-title.ts';
import './page-layout.ts';
import './page-icon.ts';
import './page-card.ts';
import './page-table.ts';
import './page-img.ts';
import './page-form.ts';
import './page-typography.ts';
import './showcase-app.ts';
import {
    HttpClientIF,
    HttpClientService,
    CorsMode,
    Credentials
} from "@domoskanonos/frontend-basis/source/http-client-service";


@customElement('app-root')
class ShowcaseApp extends AbstractApp {

    async preRender(): Promise<void> {
        I18nService.getInstance().saveData(messageDE);
        I18nService.getInstance().saveData(messageEN, 'en-EN');

        let config = HttpClientService.getInstance().config;
        config.baseURL = 'http://v220190910399797452.supersrv.de:8099';
        config.credentials = Credentials.INCLUDE;
        config.cors = CorsMode.CORS;
        config.defaultContentType = 'application/json';
        config.isSecured = true;
        config.loginPath = '/dologin';
        config.logoutPath = '/dologout';

        return super.preRender();
    }

   renderPage(): TemplateResult {
      let path = RouterService.getInstance().getPath();
      console.log('current path: '.concat(path));
      switch (path) {
          case '#pageicon':
              return html`<page-icon></page-icon>`;
          case '#pagecard':
              return html`<page-card></page-card>`;
          case '#pageprimarytitle':
              return html`<page-primary-title></page-primary-title>`;
          case '#pagetable':
              return html`<page-table></page-table>`;
          case '#pageimg':
              return html`<page-img></page-img>`;
          case '#pageinput':
              return html`<page-inputfield></page-inputfield>`;
          case '#pagetypography':
              return html`<page-typography></page-typography>`;
          case '#pagemenubar':
              return html`<page-menubar></page-menubar>`;
          case '#pagelayout':
              return html`<page-layout></page-layout>`;
          case '#pageform':
              return html`<page-form></page-form>`;
          case '#getStarted':
              return html`<page-get-started></page-get-started>`;
          case '':
          case '#dashboard':
          default:
              return html`<page-introduction></page-introduction>`;
      }
   }
}