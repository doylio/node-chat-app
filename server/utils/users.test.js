const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "Colin",
            room: "Rugby"
        }, {
            id: '2',
            name: "Eric",
            room: "Soccer"
        }, {
            id: '3',
            name: "Devin",
            room: "Rugby"
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let newUser = {
            id: '1232',
            name: "R2D2",
            room: "Dagoba"
        };
        users.addUser(newUser.id, newUser.name, newUser.room);

        expect(users.users).toMatchObject([newUser]);
    });
    it('should return names for the rugby room', () => {
        let userList = users.getUserList('Rugby');
        expect(userList).toMatchObject(['Colin', 'Devin']);
    });
    it('should return names for the soccer room', () => {
        let userList = users.getUserList('Soccer');
        expect(userList).toMatchObject(['Eric']);
    });
    it('should remove a user', () => {
        let id = '1';
        users.removeUser(id);
        expect(users.users.length).toBe(2);
        expect(users.users).toMatchObject([{
            id: '2',
            name: "Eric",
            room: "Soccer"
        }, {
            id: '3',
            name: "Devin",
            room: "Rugby"
        }]);
    });
    it('should not remove user', () => {
        let id = '133';
        users.removeUser(id);
        expect(users.users.length).toBe(3);
        expect(users.users).toMatchObject([{
            id: '1',
            name: "Colin",
            room: "Rugby"
        }, {
            id: '2',
            name: "Eric",
            room: "Soccer"
        }, {
            id: '3',
            name: "Devin",
            room: "Rugby"
        }]);
    });
    it('should find user', () => {
        let id = '2';
        let foundUser = users.getUser(id);
        expect(foundUser).toMatchObject({
            id: '2',
            name: "Eric",
            room: "Soccer"
        });
    });
    it('should not find user', () => {
        let id = '222';
        let foundUser = users.getUser(id);
        expect(foundUser).not.toBeDefined();
    });
});