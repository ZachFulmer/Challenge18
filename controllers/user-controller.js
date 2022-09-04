const { User } = require('../models');

const UserController = {
    // Get all users
    getAllUser(req, res) {
      User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
    },

    // Get user by their id
    getUserById(req, res) {
      User.findOne({ _id: req.params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },
    
    // Create a user
    createUser(req, res) {
      User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
    },

    // Update a user
    updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },

    // delete a user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.id })
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Add friend to user's friends array
    addFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.id }, 
          { $addToSet: { friends: req.params.friendsId }},
          {
            runValidators: true,
            new: true
          }).then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          }).catch((err) => res.status(400).json(err));
    },

    // remove friend from user's friends array
    removeFriend(req, res) {
      User.findOneAndUpdate(
      { _id: req.params.id }, 
      { $pull: { friends: req.params.friendsId }}, 
      {
        runValidators: true,
        new: true
      }).then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      }).catch((err) => res.status(400).json(err));
    }
  };

module.exports = UserController;