import * as React from 'react';
import EmptyModel from "@common/model/EmptyModel";
import BaseView from "@common/view/BaseView";
import ClientMessagesUtil from "@common/util/ClientMessagesUtil";

export default class AboutUsView extends BaseView<EmptyModel, string> {
    renderContent(): React.ReactNode {
        console.log(ClientMessagesUtil.getMessageByFullKey('Base.signUp'));
        return <div>about</div>;
    }
    createModel(props?: any): EmptyModel {
        return new EmptyModel(props);
    }
}