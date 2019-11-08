import { customElement, html, TemplateResult } from 'lit-element';
import { PageIntroduction } from './page-introduction';
import { AbstractApp } from '../abstract-component/component';
import { PageInput } from './page-input';
import { PageGetStarted } from './page-get-started';
import { RouterService } from '@domoskanonos/frontend-basis';

@customElement('app-root')
class ShowcaseApp extends AbstractApp {
   renderPage(): TemplateResult {
      let path = RouterService.getInstance().getPath();
      console.log('current path: '.concat(path));
      switch (path) {
         case '#input':
            return html`
               ${new PageInput()}
            `;
         case '#getStarted':
            return html`
               ${new PageGetStarted()}
            `;
         case '':
         case '#dashboard':
         default:
            return html`
               ${new PageIntroduction()}
            `;
      }
   }
}
