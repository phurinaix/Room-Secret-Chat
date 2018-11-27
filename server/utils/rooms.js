class Rooms {
    constructor () {
        this.rooms = [];
    }
    addRoom (name) {
        this.rooms.push(name);
        return name;
    }
    removeRoom (name) {
        var room = this.getUser(name);

        if (room) {
            this.rooms = this.rooms.filter((room) => room !== name);
        }
        return room;
    }
    getRoom (name) {
        return this.rooms.filter((room) => room === name)[0];
    }
    getRoomList () {
        return this.rooms;
    }
}

module.exports = {Rooms};