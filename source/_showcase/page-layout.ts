import {customElement, html, property, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {HTMLInputTypes} from '../input/component';
import {FlexPadding, FlexPaddingAlignment} from '../flex-container/component';
import {TypographyTypes} from '../typography/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComponentLoader} from '../abstract/component-loader';
import {IconComponent, IconInputData} from '../icon/component';

@customElement('page-layout')
export class PageLayoutComponent extends PageAbstract {


    @property()
    flexPaddingAlignment: FlexPaddingAlignment = FlexPaddingAlignment.BOTH;

    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container containerClazz="container_75" .padding="${FlexPadding.MEDIUM}" itemFlexBasisValue="50%">
            <component-flex-container .padding="${FlexPadding.MEDIUM}" itemFlexBasisValue="100%">
               <component-typography type="${TypographyTypes.H2}">Seiten-Layout</component-typography>
               <component-typography type="${TypographyTypes.BODY1}"
                  ><i>Component Flex Container</i> ist eine moderne und einfache Möglichkeit, responsive und flexible Layouts zu
                  erstellen, ohne feste Größenangaben und weitere CSS-Einstellungen wie position, float oder clear nutzen zu
                  müssen. Dabei kann nicht nur die Größendarstellung, sondern auch die Reihenfolge der Elemente unabhängig vom
                  HTML-Code durch CSS festgelegt werden.</component-typography
               >

               <component-inputfield .type="${HTMLInputTypes.CHECKBOX}" value="Headless Padding"></component-inputfield>

               <component-tabs  @component-icon-click="${(event: CustomEvent) => this.iconClicked(event)}">
                  <component-tab slot="tab" selected="true" tabContentId="flexPaddingAlignmentContent"
                     >FlexPaddingAlignment</component-tab
                  >
                  <component-tab-content slot="tabContent" id="flexPaddingAlignmentContent" selected="true">
                     <component-simple-table
                        .headers="${['value', 'try it']}"
                        .rows="${[
            <SimpleTableRowData>{
                columns: [
                    'HORIZONTAL',
                    ComponentLoader.INSTANCE.createComponentFromInputData(<IconInputData>{
                        componentIdentifier: IconComponent.IDENTIFIER,
                        icon: 'build',
                        clickable: true,
                        clickData: FlexPaddingAlignment.HORIZONTAL,
                        status: 1
                    })
                ]
            },
            <SimpleTableRowData>{
                columns: [
                    'VERTICAL',
                    ComponentLoader.INSTANCE.createComponentFromInputData(<IconInputData>{
                        componentIdentifier: IconComponent.IDENTIFIER,
                        icon: 'build',
                        clickable: true,
                        clickData: FlexPaddingAlignment.VERTICAL,
                        status: 1
                    })
                ]
            },
            <SimpleTableRowData>{
                columns: [
                    'BOTH',
                    ComponentLoader.INSTANCE.createComponentFromInputData(<IconInputData>{
                        componentIdentifier: IconComponent.IDENTIFIER,
                        icon: 'build',
                        clickable: true,
                        clickData: FlexPaddingAlignment.BOTH,
                        status: 1
                    })
                ]
            }
        ]}"
                     ></component-simple-table>
                  </component-tab-content>

                  <component-tab slot="tab" tabContentId="htmlContent">FlexPadding</component-tab>
               </component-tabs>
            </component-flex-container>

            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="resultContent">Result</component-tab>
               <component-tab-content slot="tabContent" id="resultContent" selected="true">
                  <component-flex-container containerClazz="surfaceColor" .padding="${FlexPadding.MEDIUM}" .paddingAlignment="${this.flexPaddingAlignment}">
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                  </component-flex-container>
               </component-tab-content>

               <component-tab slot="tab" tabContentId="codeContent">Code</component-tab>
               <component-tab-content slot="tabContent" id="codeContent">
                  <component-code code="<component-flex-container flexPaddingAlignment=${this.flexPaddingAlignment}></component-flex-container>"></component-code>
               </component-tab-content>
            </component-tabs>
         </component-flex-container>
      `;
    }

    private iconClicked(event: CustomEvent) {
        this.flexPaddingAlignment = event.detail.clickData;
    }
}
