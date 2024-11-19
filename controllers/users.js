const mongodb = require('../data/database'); 

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().collection('users').find({ user_id: userId });
    result.toArray().then((users) => {
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const lastUser = await mongodb.getDatabase().collection('users').find().sort({ user_id: -1 }).limit(1).toArray();
     // Generate new user_id
    const newUserId = lastUser.length > 0 ? lastUser[0].user_id + 1 : 1;

    const user = {
        user_id: newUserId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        pet_preference: req.body.pet_preference
    };

    const response = await mongodb.getDatabase().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = parseInt(req.params.id);
    const updatedUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        pet_preference: req.body.pet_preference
    };

    const response = await mongodb.getDatabase().collection('users').updateOne(
        { user_id: userId },
        { $set: updatedUser }
    );

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = parseInt(req.params.id);
    const response = await mongodb.getDatabase().collection('users').deleteOne({ user_id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };