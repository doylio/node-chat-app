//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let removedUser = this.users.find(user => user.id === id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room).map(user => user.name);
    }
}

module.exports = {Users};