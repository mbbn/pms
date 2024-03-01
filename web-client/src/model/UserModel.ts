import BaseModel from "./BaseModel";

export default class UserModel extends BaseModel<string> {

    static readonly FIRST_NAME = 'firstName';
    static readonly LAST_NAME = 'lastName';

    firstName: string | undefined;
    lastName: string | undefined;

    constructor(props: any) {
        super(props);
    }
}