import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from "..";

const componentCSS = require('./component.css');

export class SimpleTableRowData extends AbstractInputData {
    columns: any[] = [];
}

export class SimpleTableData extends AbstractInputData {
}

@customElement('component-simple-table')
export class SimpleTableComponent extends AbstractComponent<SimpleTableData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'CodeComponent';

    @property()
    headers: string[] = [];

    @property()
    rows: SimpleTableRowData[] = [];

    render() {
        return html`
         <div>
            <table>
               <thead>
                  ${guard(
            [this.headers],
            () =>
                html`
                           ${repeat(
                    this.headers,
                    (header) =>
                        html`
                                    <th colspan="1" rowspan="1">${header}</th>
                                 `
                )}
                        `
        )}
               </thead>
               <tbody>
                  ${guard(
            [this.rows],
            () =>
                html`
                           ${repeat(
                    this.rows,
                    (row) =>
                        html`
                                    <tr>
                                       ${repeat(
                            row.columns,
                            (value) =>
                                html`
                                                   <td colspan="1" rowspan="1">${this.renderValue(value)}</td>
                                             `
                        )}
                                    </tr>
                                 `
                )}
                        `
        )}
               </tbody>
            </table>
         </div>
      `;
    }

    getDefaultInputData(): SimpleTableData {
        return <SimpleTableData>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
    }

    private renderValue(value: any) {
        if (value instanceof AbstractInputData) {
            return ComponentLoader.INSTANCE.createComponentFromInputData(value);
        }
        return value;
    }
}
