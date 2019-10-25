import {LitElement, property} from 'lit-element';
import {AbstractInputData} from './model';
import {baseHelper} from "../../util/base";
import {DATA_RECEIVER, DataReceiverListener} from "../../util/data-receiver/data-receiver";
import {I18N} from "../../util/i18n-util";
import {router} from "../../util/router";
import {UI_REFRESHER} from "../../index";
import { UIRefresherListener } from '@domoskanonos/typescript_base';

export abstract class AbstractComponent<INPUT_DATA extends AbstractInputData,
    OUTPUT_DATA> extends LitElement implements DataReceiverListener, UIRefresherListener {

    @property()
    private _inputData: INPUT_DATA = <INPUT_DATA>{};

    public abstract getDefaultInputData(): INPUT_DATA;

    public abstract getOutputData(): OUTPUT_DATA;

    protected abstract inputDataChanged(): void;

    @property()
    dataReceiverChannels: string[] = [];

    @property()
    uiRefreshChannels: string[] = [];

    protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (this.dataReceiverChannels != undefined) {
            this.dataReceiverChannels.forEach(channel => {
                DATA_RECEIVER.register(channel, this);
            })
        }
        if (this.uiRefreshChannels != undefined) {
            this.uiRefreshChannels.forEach(channel => {
                UI_REFRESHER.register(channel, this);
            });
        }
    }

    disconnectedCallback(): void {
        console.log('disconnected');
        if (this.dataReceiverChannels != undefined) {
            this.dataReceiverChannels.forEach(channel => {
                DATA_RECEIVER.unregister(channel, this);
            });
        }
        if (this.uiRefreshChannels != undefined) {
            this.uiRefreshChannels.forEach(channel => {
                UI_REFRESHER.unregister(channel, this);
            });
        }
    }

    dataRecieved(channel: string, data: any): void {
        console.log('channel has updated: ' + channel + ",component " + this.inputData.componentIdentifier + ', data=' + JSON.stringify(data));
        this.inputData = <INPUT_DATA>this.inputData;
    }

    updateUI(channel: string): void {
        console.log('update ui, channel:' + channel)
        this.reqUpdate();
    }

    get inputData(): INPUT_DATA {
        return this._inputData;
    }


    set inputData(value: INPUT_DATA) {
        this._inputData = value;
        console.debug(
            'input data changed, new value=' + JSON.stringify(this._inputData)
        );
        if (baseHelper.isNotEmpty(this._inputData)) {
            this.dataReceiverChannels = baseHelper.getValue(this._inputData.dataReceiverChannels, []);
        } else {
            throw new Error("empty input data: " + JSON.stringify(this));
        }

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

    public getI18NValue(key: string): string | null | undefined {
        return I18N.getValue(key);
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
        childEvent: CustomEvent,
        data?: any
    ) {
        this.dispatchSimpleCustomEvent(eventName, {
            data,
            childData: childEvent.detail
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

    protected getPageName(): string {
        return router.getPath().replace('#', '');
    }

}
