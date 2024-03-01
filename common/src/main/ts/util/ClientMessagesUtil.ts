import BaseModel from "../model/BaseModel";
import ClientReflectionUtil from "./ClientReflectionUtil";
import StringUtil from "./StringUtil";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Locale from "@common/locale/Locale";

export default class ClientMessagesUtil {

    static readonly BASE_MESSAGES = 'Base';
    static readonly COMMON_MESSAGES = 'Common';

    static getBaseMessage(key: string, args?: {}): string {
        // return ClientMessagesUtil.intl().formatMessage({id: ClientMessagesUtil.BASE_MESSAGES + '.' + key}, args);
        return '';
    }

    static getCommonMessage(key: string, args?: {}): string {
        // return ClientMessagesUtil.intl().formatMessage({id: ClientMessagesUtil.COMMON_MESSAGES + '.' + key}, args);
        return '';
    }

    /**
     *
     * @param messagesNameOrModelOrModelClass messages name (maybe without 'Model' or 'Messages' suffix), model or model class
     * @param key of message
     * @param args if exists
     * @returns formatted messasge
     */
    static getMessage<M extends BaseModel<any>>(messagesNameOrModelOrModelClass: string | M | { new(): M; }, key: string, args?: {}): string {
        console.log(messagesNameOrModelOrModelClass, key, args);
        return '';
    }

    static getMessageByFullKey(messageFullKey: string, args?: {}): string {
        const {t} = i18n;
        if(this.contains(messageFullKey)){
            return t(messageFullKey);
        }
        return undefined;
    }

    static contains(messageFullKey: string) {
        const {exists} = i18n;
        return exists(messageFullKey);
    }
}