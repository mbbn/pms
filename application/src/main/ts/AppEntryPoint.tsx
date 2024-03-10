import {render as renderRoot} from "@common/entrypoint/BaseEntryPoint";

function getMessagesJson(){
    return require('../../../build/messages.json');
}

export function render() {
    let messagesJson = getMessagesJson();
    renderRoot(messagesJson);
}