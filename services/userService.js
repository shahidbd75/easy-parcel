import models from "../models";


export const saveUser = async (userModel) => {
    const user =  new models.User({
        username: userModel.username,
        createdAt: new Date()
    });
    return await user.save();
};
