import {customElement, html, TemplateResult} from 'lit-element';
import {AbstractApp} from '../abstract-component/component';
import {RouterService} from '@domoskanonos/frontend-basis';
import {I18nService} from "@domoskanonos/frontend-basis/source/i18n-service";
import messageDE from './message-de.json';
import messageEN from './message-en.json';

import './page-introduction';
import './page-get-started';
import './page-input.ts';
import './page-icon.ts';
import './page-form.ts';
import './page-typography.ts';
import './showcase-app.ts';


@customElement('app-root')
class ShowcaseApp extends AbstractApp {

    async preRender(): Promise<void> {
        I18nService.getInstance().saveData(messageDE);
        I18nService.getInstance().saveData(messageEN, 'en-EN');
        return super.preRender();
    }

   renderPage(): TemplateResult {
      let path = RouterService.getInstance().getPath();
      console.log('current path: '.concat(path));
      switch (path) {
          case '#pageicon':
              return html`<page-icon></page-icon>`;
          case '#pageinput':
              return html`<page-inputfield></page-inputfield>`;
          case '#pagetypography':
              return html`<page-typography></page-typography>`;
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