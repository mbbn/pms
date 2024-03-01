import * as React from 'react';
import {Formik} from 'formik';
import BaseModel from "../model/BaseModel";
import i18n from "../i18n/i18n";
import ClientMessagesUtil from "../util/ClientMessagesUtil";

export interface BaseViewProps<M extends BaseModel> {
    model: M;
}

export interface ViewState<M extends BaseModel> {
    model: M;
}

export default abstract class BaseView<M extends BaseModel> extends React.Component<any, any> {

    // state: any = this.getHistoryState() ? this.getHistoryState() : this.getInitialState();
    state:any = this.getInitialState();
    formik: Formik;
    setStateIsInProgress = false; // If true, 'formik.state.values' is stale and 'state.model' should be used.

    getInitialState(): ViewState<M> {
        return {
            model: this.createModel()
        };
    }

    abstract renderContent(): React.ReactNode;

    abstract createModel(props?: any): M;

    /*getHistoryState(): ViewState<M> {
        return this.shouldRestoreStateOnNavigateBack() && window.history.state && window.history.state[BaseView.VIEW_STATE_IN_HISTORY]
        && window.history.state[BaseView.VIEW_POSITION_IN_HISTORY] !== window.history.length ? // Do not restore history state if user refreshes last page in history (in last page, user prefers to load fresh page)
            this.reviseState(window.history.state[BaseView.VIEW_STATE_IN_HISTORY]) : null;
    }*/
    render(): React.ReactNode {
        const renderContent = this.renderContent();
        if (!renderContent) {
            return null;
        }
        return (
            // <div id={this.getElementId()}>
            //     <HotKeys keyMap={ShortcutHandler.getShortcutsMap(this.getShortcuts())} handlers={ShortcutHandler.getShortcutHandlers(this.getShortcuts())}>
                    renderContent
                // </HotKeys>
                // {this.renderViewFooter()}
            // </div>
        );
    }

    /*renderViewFooter(): React.ReactNode {
        if (!UrlHandler.getShowFooterParam() || UserAgent.isMediumOrSmallerScreen()) {
            return null;
        }
        return (
            <div style={{width: '100%', backgroundColor: '#90caf9', padding: 20, marginTop: 10}}>
                {[...this.getShortcuts(), ...this.getDefaultShortcuts()].map((shortcut, index) => <Button
                    buttonType={new ButtonType(null, shortcut.getKeyAndTitle())} className="shortcut"
                    onClick={shortcut.command} key={index}/>)}
            </div>
        );
    }*/

    getModel(): M | null {
        if (this.formik && !this.setStateIsInProgress) {
            return this.getFormikModel();
        } else {
            return this.getStateModel();
        }
    }

    getStateModel(): M {
        return this.state.model;
    }

    getFormikModel(): M | null {
        return this.formik ? this.formik.state.values as M : null;
    }

    setModel(model: M): void {
        this.setState({model});
    }

    setState(state: any, callback?: () => void): void {
        this.setStateIsInProgress = true;
        this.reviseState(state);
        super.setState(state, () => {
            if (state.model && this.formik) {
                this.formik.resetForm(state.model);
            }
            this.setStateIsInProgress = false;
            if (callback) {
                callback();
            }
        });
    }

    reviseState(state: ViewState<M>): ViewState<M> {
        if (!state) {
            state = {model: this.createModel()};
        } else if (state.hasOwnProperty('model') && state.model == null) {
            state.model = this.createModel();
        } else if (state.model != null && !(state.model instanceof BaseModel)) {
            state.model = this.createModel(state.model);
        }
        return state;
    }

    protected getMessage(id: string, args?: {}): string {
        return ClientMessagesUtil.getMessage(this.getModel(), id, args);
    }
}