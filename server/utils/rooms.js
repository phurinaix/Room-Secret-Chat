class Rooms {
    constructor () {
        this.rooms = [];
    }
    addRoom (name, password) {
        var room = {name, password};
        this.rooms.push(room);
        return room;
    }
    removeRoom (name) {
        var room = this.getRoom(name);
        if (room) {
            this.rooms = this.rooms.filter((room) => room.name !== name);
        }
        return room;
    }
    getRoom (name) {
        return this.rooms.filter((room) => room.name === name)[0];
    }
    getRoomList () {
        var roomsArray = this.rooms.map(room => {
            return room.name
        });
        return roomsArray;
    }
}

module.exports = {Rooms};