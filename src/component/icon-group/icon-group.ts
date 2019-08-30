import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/abstract-component';
import {IconGroup, Icon, Link} from '../../interface/atoms';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';

const componentCSS = require('./icon-group.scss');

@customElement('component-icon-group')
export class IconGroupComponent extends AbstractComponent<IconGroup,
    undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'IconGroupComponent';

    static EVENT_ICON_CLICK: string = 'component-icon-group-icon-click';

    @property()
    icons: Icon[];

    @property()
    clazz: string;

    render() {
        return html`<span class="${this.clazz}">
         ${guard(
            this.icons,
            () =>
                html`
                  ${repeat(
                    this.icons,
                    (icon, index) => html`
                        <component-icon .inputData="${icon}"  @component-icon-click="${(
                        event: CustomEvent
                    ) => this.iconClicked(index, event)}"></component-icon>
                     `
                )}
               `
        )}
         </span>
      `;
    }

    iconClicked(index: number, event: CustomEvent) {
        this.dispatchCompoundCustomEvent(
            IconGroupComponent.EVENT_ICON_CLICK,
            event,
            index
        );
    }

    getDefaultInputData(): IconGroup {
        return <IconGroup>{};
    }

    inputDataChanged() {
        this.icons = this.inputData.icons;
        this.clazz = this.inputData.clazz !== undefined ? this.inputData.clazz : '';
    }

    getOutputData(): undefined {
        return undefined;
    }
}
