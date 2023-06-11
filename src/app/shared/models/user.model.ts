import { AuthGuard } from "../guards/auth.guard";



class User  {
    id?: string | number;
    username?: string;
    provider?: string;
    email?: string;
    password?: string;
    token?: string;
    jwt?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    UserRole?: string;

    constructor(obj?: User) {
        obj = obj || {};
        this.id = obj.id || undefined;
        this.username = obj.username || '';
        this.provider = obj.provider || '';
        this.email = obj.email || '';
        this.password = obj.password || '';
        this.confirmed = obj.confirmed || false;
        this.blocked = obj.blocked || false;
        this.createdAt = obj.createdAt || '';
        this.updatedAt = obj.updatedAt || '';
        this.UserRole = obj.UserRole || '';
    }
}

export enum RoleType {
    SuperAdmim = 1,
    ResOwner = 2,
    Customer = 3
}

export enum RecordStatus {
    All = 0,
    Active = 1,
    InActive = 2,
    Deleted = 3,
    Draft = 4,
}
type TRoles = 'SuperAdmim'| 'ResOwner' | 'Customer' | undefined;
enum Roles {
    SuperAdmim = 'SuperAdmim',
    ResOwner = "ResOwner",
    Customer = "Customer"
}

class UserFactory {
    public static createUser(data: any) {
        const type = data.type;
        switch (type) {
            default:
                return new User(data);
        }
    }
    public static role(): TRoles {
        const token = AuthGuard.decodeToken();
        let role = undefined;
        if(token) {
            role = token.RoleName
        }
        return role;
    }
    public static isAdmin(): boolean {
        const role = this.role();
        let res = false;
        if (role) {
            res = role == Roles.SuperAdmim;
        }
        return res;
    }

    public static isOwner(): boolean {
        const role = this.role();
        let res = false;
        if (role) {
            res = role == Roles.ResOwner;
        }
        return res;
    }

    public static isUser(): boolean {
        const role = this.role();
        let res = false;
        if (role) {
            res = role == Roles.Customer;
        }
        return res;
    }
}



export { User, UserFactory, Roles, TRoles };
