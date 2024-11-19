const mongodb = require('../data/database'); 

const getAll = async (req, res) => {
    //#swagger.tags=['Pets']
    const result = await mongodb.getDatabase().collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().collection('pets').find({ pet_id: petId });
    result.toArray().then((pets) => {
        if (pets.length === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0]);
    });
};

const createPet = async (req, res) => {
    //#swagger.tags=['Pets']
    const lastPet = await mongodb.getDatabase().collection('pets').find().sort({ pet_id: -1 }).limit(1).toArray();
     // Generate new pet_id
    const newPetId = lastPet.length > 0 ? lastPet[0].pet_id + 1 : 1;

    const pet = {
        pet_id: newPetId,
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        shelter_site: req.body.shelter_site,
        description: req.body.description
    };

    const response = await mongodb.getDatabase().collection('pets').insertOne(pet);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the pet.');
    }
};

const updatePet = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = parseInt(req.params.id);
    const updatedPet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        shelter_site: req.body.shelter_site,
        description: req.body.description
    };

    const response = await mongodb.getDatabase().collection('pets').updateOne(
        { pet_id: petId },
        { $set: updatedPet }
    );

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the pet.');
    }
};

const deletePet = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = parseInt(req.params.id);
    const response = await mongodb.getDatabase().collection('pets').deleteOne({ pet_id: petId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the pet.');
    }
};

module.exports = { getAll, getSingle, createPet, updatePet, deletePet };