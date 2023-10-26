const user ={}

function checkUser(userid){
    if(user[userid]){
        return 'User already exists!';
    }
}

function verifyLogin(userid){
    if(user[userid]){
        return true;
    }
    else 
    return false;
}

function addUser({ username, userid, lastname, location }){
    user[userid]={username, userid, lastname, location};
}

function getUser(userid)
{
    return user[userid];
}

function updateUser(username, userid, lastname, location){
    user[userid] = {username, userid, lastname, location};
}

module.exports = {
    addUser,
    checkUser,
    getUser,
    updateUser,
    verifyLogin,
    user,
};