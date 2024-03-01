import BaseModel from "../model/BaseModel";
import ClientReflectionUtil from "./ClientReflectionUtil";
import StringUtil from "./StringUtil";

export default class ClientMessagesUtil {

    static intlObject: any;

    static intl() {
        return this.intlObject;
    }

    static setIntl(intl: any) {
        this.intlObject = intl;
    }

    /**
     *
     * @param messagesNameOrModelOrModelClass messages name (maybe without 'Model' or 'Messages' suffix), model or model class
     * @param key of message
     * @param args if exists
     * @returns formatted messasge
     */
    static getMessage<M extends BaseModel<any>>(messagesNameOrModelOrModelClass: string | M | { new(): M; }, key: string, args?: {}): string {
        return this.getMessageByFullKey(this.getMessageFullKey(messagesNameOrModelOrModelClass, key), args);
    }

    static getMessageByFullKey(messageFullKey: string, args?: {}): string {

    }
}