import { LitElement, property } from 'lit-element';
import { AbstractInputData } from './model';

export abstract class AbstractComponent<
   INPUT_DATA extends AbstractInputData,
   OUTPUT_DATA
> extends LitElement {
   @property()
   private _inputData: INPUT_DATA;

   public abstract getDefaultInputData(): INPUT_DATA;

   public abstract getOutputData(): OUTPUT_DATA;

   protected abstract inputDataChanged(): void;

   constructor() {
      super();
   }

   get inputData(): INPUT_DATA {
      return this._inputData;
   }

   set inputData(value: INPUT_DATA) {
      this._inputData = value;
      console.debug(
         'input data changed, new value=' + JSON.stringify(this._inputData)
      );
      this.inputDataChanged();
   }

   public getClazzName(): string {
      return this.constructor.name;
   }

   public getCSS(): string {
      return '';
   }

   public getInputJson(): string {
      return JSON.stringify(this._inputData);
   }

   public getOutputJson(): string {
      return JSON.stringify(this.getOutputData());
   }

   public getInputDataAsJavascriptString(): string {
      return this.objToString(this._inputData);
   }

   public getOutputDataAsJavascriptString(): string {
      return this.objToString(this.getOutputData());
   }

   public getEventList(): string[] {
      return [];
   }

   objToString(obj: any) {
      if (obj == null) return '{}';
      let objAsJson = JSON.stringify(obj, null, 2);
      objAsJson = objAsJson.split('":').join(':');
      objAsJson = objAsJson.split('  "').join('');
      objAsJson = objAsJson.split('"').join("'");
      return objAsJson;
   }

   reqUpdate() {
      console.log('reqUpdate...');
      this.requestUpdate().then((value) => {
         console.log('View updated: ' + value);
      });
   }

   protected dispatchCompoundCustomEvent(
      eventName: string,
      childEvent: Event,
      data?: any
   ) {
      this.dispatchSimpleCustomEvent(eventName, {
         data,
         childEvent: childEvent
      });
   }

   protected dispatchSimpleCustomEvent(eventName: string, data?: any) {
      console.log(
         'dispatch simple custom event: ' +
            eventName +
            ', data=' +
            JSON.stringify(data)
      );
      let valueChanged = new CustomEvent(eventName, {
         detail: data,
         bubbles: true,
         composed: true
      });
      this.dispatchEvent(valueChanged);
   }
}
