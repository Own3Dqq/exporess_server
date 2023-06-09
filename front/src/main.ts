let x: number = 10;

function sum(a: number, b: number): number {
    return a + b;
}

let nums: number[] = [2,6,3,4];
nums.find((value: number) => value > 2 );

interface IUserContacts {
    email: string;
    phone: string;
}

interface IUser { 
    name: string; 
    age: number;
    surname?: string;
    // getContacts: (key: string) => IUserContacts;
}

interface IFullUser extends IUserContacts, IUser {}

function getInfo(user: IUser): string {
    return user.name;
}

let user: IFullUser = {
    name: 'John',
    age: 10,
    email: 'email',
    phone: '12345'
}



class Admin implements IUser {
    public readonly name: string;
    public readonly age: number;
    protected readonly email: string;

    public constructor(user: IFullUser) {
       this.name =  user.name;
       this.email = user.email;
       this.age = user.age;
    }

    private login(password: string): boolean {
        let isCorrectPassword = !!password;

        return isCorrectPassword && !!this.email;
    }
}

class Manager extends Admin {
    
    public getEmail(): string {
        return this.email;
    }
}

let admin: Admin = new Admin(user);

// admin.name