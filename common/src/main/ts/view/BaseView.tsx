import * as React from 'react';
import BaseModel from "@common/model/BaseModel";
import {getBaseMessage, getMessage} from "@common/provider/LocalProvider";
import {BaseService} from "@common/service/BaseService";

export interface ViewState<M extends BaseModel<I>, I> {
    model: M;
}

export default abstract class BaseView<M extends BaseModel<I>, I> extends React.Component<any, any> {

    state:any = this.getInitialState();
    setStateIsInProgress = false; // If true, 'formik.state.values' is stale and 'state.model' should be used.
    service: BaseService<M, I>;

    getInitialState(): ViewState<M, I> {
        return {
            model: this.createModel()
        };
    }

    abstract renderContent(): React.ReactNode;

    abstract createModel(props?: any): M;
    constructor(props: any, context: any, service: BaseService<M, I>) {
        super(props, context);
        this.service = service;
    }
    render(): React.ReactNode {
        const renderContent = this.renderContent();
        if (!renderContent) {
            return null;
        }
        return (renderContent);
    }

    getModel(): M | null {
        return this.getStateModel();
    }

    getStateModel(): M {
        return this.state.model;
    }

    setModel(model: M): void {
        this.setState({model});
    }

    setState(state: any, callback?: () => void): void {
        this.setStateIsInProgress = true;
        this.reviseState(state);
        super.setState(state, () => {
            this.setStateIsInProgress = false;
            if (callback) {
                callback();
            }
        });
    }

    reviseState(state: ViewState<M, I>): ViewState<M, I> {
        if (!state) {
            state = {model: this.createModel()};
        } else if (state.hasOwnProperty('model') && state.model == null) {
            state.model = this.createModel();
        } else if (state.model != null && !(state.model instanceof BaseModel)) {
            state.model = this.createModel(state.model);
        }
        return state;
    }

    getBaseMessage(key: string) {
        return getBaseMessage(key);
    }
}