import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ButtonComponent, ButtonInputData } from '../button/component';

const componentCSS = require('./component.css');

export class DataProtectionInputData extends AbstractInputData {
   buttonInputData?: ButtonInputData;
   lawtext?: string;
}

@customElement('component-data-protection')
export class DataProtection extends AbstractComponent<DataProtectionInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'DataProtection';

   static LOCAL_STORAGE_ACCEPT_KEY = 'component-data-protection-accept';

   @property()
   buttonInputData: ButtonInputData = <ButtonInputData>{};

   @property()
   lawText: string = '';

   @property()
   isAccepted: boolean;

   constructor() {
      super();
      this.isAccepted = this.getLocalStorageAcceptValue();
   }

   getLocalStorageAcceptValue(): boolean {
      let isAcceptedAsNumber = Number(localStorage.getItem(DataProtection.LOCAL_STORAGE_ACCEPT_KEY));
      let isAccepted = isAcceptedAsNumber === 1;
      console.log('Already accepted ? ' + this.isAccepted);
      return isAccepted;
   }

   setLocalStorageAcceptValue(acceptValue: boolean): void {
      localStorage.setItem(DataProtection.LOCAL_STORAGE_ACCEPT_KEY, acceptValue ? '1' : '0');
   }

   render() {
      return html`
         <div style="${this.isAccepted ? 'display: none;' : ''}">
            <component-button .inputData="${this.buttonInputData}" @click="${this.accept}">${this.lawText}</component-button>
         </div>
      `;
   }

   async accept() {
      this.setLocalStorageAcceptValue(true);
   }

   getDefaultInputData(): DataProtectionInputData {
      return <DataProtectionInputData>{
         componentIdentifier: DataProtection.IDENTIFIER,
         buttonInputData: <ButtonInputData>{
            componentIdentifier: ButtonComponent.IDENTIFIER,
            text: 'Einverstanden'
         },
         lawtext:
            'Diese Website verwendet Cookies – nähere Informationen dazu und zu Ihren Rechten als Benutzer finden Sie in unserer Datenschutzerklärung am Ende der Seite. Klicken Sie auf „Ich stimme zu“, um Cookies zu akzeptieren und direkt unsere Website besuchen zu können.'
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.buttonInputData = this.basicService.getValue(this.inputData.buttonInputData, new ButtonInputData());
      this.lawText = this.basicService.getValue(this.inputData.lawtext, '');
   }
}
