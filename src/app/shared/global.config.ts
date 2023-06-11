
export class GLOBAL {
    private static _currentUser: any;


    public static get currentUser(): any {
        return this._currentUser;
    }

    public static set currentUser(user: any) {
        this._currentUser = user;
    }


 }
