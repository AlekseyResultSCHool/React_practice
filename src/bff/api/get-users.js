import { transformUser } from '../operations/transformers';

export const getUsers = () => 
    fetch('http://localhost:3005/users')
        .then((loadedUsers) => loadedUsers.json())
        .then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));