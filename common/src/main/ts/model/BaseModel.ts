import ClientMessagesUtil from "../util/ClientMessagesUtil";

export default abstract class BaseModel<I> {

    static readonly ID = 'id';

    id: I | undefined;
    protected constructor(props?: any) {
        this.clearAndSetNewProps(props);
    }

    clearAndSetNewProps(props?: {}) {
        // @ts-ignore
        Object.keys(this).filter(prop => prop !== '@class').forEach(prop => delete this[prop]);
        props = props ? props : {};
        // @ts-ignore
        this.id = props['id'];
        // @ts-ignore
        Object.keys(props).forEach(prop => this[prop] = props[prop]);
    }

    getEntityName(): string {
        return this.constructor.name.substring(0, this.constructor.name.lastIndexOf('Model'));
    }

    getMessage(id: string, args?: {}): string {
        return ClientMessagesUtil.getMessage(this, id, args);
    }

    toString(): string {
        return JSON.stringify(this);
    }
}