import models from "../models";
import { NotFound } from './../utils/errors';

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
};

export const saveUser = async (userModel) => {
    const user =  new models.User({
        username: userModel.username,
        createdAt: new Date()
    });
    return await user.save();
};

export const update = async (userModel) => {
    const id = userModel._id;
    const User = models.User;
    let model = await User.findById(id);
    if(model) {
        model.username = userModel.username;
        const updatedUser = model.save();
        return updatedUser;
    }

    throw new NotFound('User Not Found');
};

export const deleteById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if(model) {
        const result = await User.deleteOne({_id: id});
        return result;
    }
    throw new NotFound('User not found by the id: ' + id);
}