const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

db.defaults({
    'roles': {}
}).write();

async function agregar(rol, userId) {
    await db.read();
    const roles = db.data['roles'];

    if (!(rol in roles)) {
        roles[rol] = [];
    }

    if (noContiene(roles[rol], userId)) {
        roles[rol].push(userId);
        await db.write();
        return true;
    }

    return false;
}

async function quitar(rol, userId) {
    await db.read();
    const roles = db.data['roles'];

    if (rol in roles && contiene(roles[rol], userId)) {
        roles[rol] = roles[rol].filter(item => item !== userId);
        await db.write();
        return true;
    }

    return false;
}

async function obtenerUserIdsDeRol(rol) {
    await db.read();
    const roles = db.data['roles'];
    if (rol in roles) return roles[rol];
    return [];
}

async function obtenerRoles() {
    await db.read();
    return Object.keys(db.data['roles']);
}

async function quiereNotificarRol(msg) {
    const roles = await obtenerRoles();
    return roles.some(rol => msg === `!${rol}`);
}

function noContiene(array, valor) {
    return array.indexOf(valor) === -1;
}

function contiene(array, valor) {
    return array.indexOf(valor) !== -1;
}

module.exports = {
    agregar,
    quitar,
    obtenerUserIdsDeRol,
    quiereNotificarRol,
    obtenerRoles,
};