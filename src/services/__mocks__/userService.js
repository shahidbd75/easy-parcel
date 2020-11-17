
export const getAllUsers = async () => {
    const users = [
        {_id:'1', username: 'shahid'},
        {_id:'2', username: 'dbuser'}
    ];
    return users;
};

export const saveUser = async (userModel) => {
    const user =  new models.User(userModel);
    return await user.save();
};