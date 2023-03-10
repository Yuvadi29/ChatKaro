const users = [];

const addUser = ({ id, name, room }) => {
    // Convert name and room to lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Check if user already exists
    const existUser = users.find((user) => user.room === room && user.name === name);

    if (existUser) {
        return { error: 'Username is taken' };
    }
    else {
        const user = { id, name, room };
        users.push(user);
        return { user };
    }

};

const removeUser = (id) => {
    // Find index of user
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUserinRoom = (room) => {
    return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserinRoom };