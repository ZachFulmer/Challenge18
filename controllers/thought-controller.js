const { response } = require('express');
const {User, Thought} = require('../models');

const ThoughtController = {
    // Get All thoughts
    getAllThought(req, res) {
      Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
    },

    // Get a single thought
    getThoughtbyId(req, res) {
      Thought.findOne({ _id: req.params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
      .then((dbThoughtData) => {
        console.log(req.body);
        return User.findOneAndUpdate(
          {username: req.body.username},
          {$push:{ thoughts: dbThoughtData._id}},
          {new:true}
        )
      }).then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      }).catch((err) => res.status(400).json(err));
    },

    // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
    },

    // Remove a thought
    removeThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.id })
        .then(deletedThought => {
            if (!deletedThought) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            console.log(deletedThought);
            return User.findOneAndUpdate(
              {username:  deletedThought.username},
              {$pull:{thoughts: req.params.id}},
              {new:true}
            )
        }).then(dbUserData =>{
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },

    // Add a reaction to the thought
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      ).then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Remove a reaction to the thought
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
    }
};

module.exports = ThoughtController;