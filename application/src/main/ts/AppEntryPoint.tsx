import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BaseEntryPoint from "@common/entrypoint/BaseEntryPoint";
import AbstractViewName from "@common/view/AbstractViewName";
import ViewName from "./ViewName";
export default class AppEntryPoint extends BaseEntryPoint {
    getFirstViewName(): AbstractViewName {
        return ViewName.ABOUT_US;
    }

    getMessagesJson(): any {
        return require('../../../build/messages.json');
    }
}