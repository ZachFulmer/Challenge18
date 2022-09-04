const {User, Thought} = require('../models');

const ThoughtController = {
    // Get All thoughts
    getAllThought(req, body) {
      Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
    },

    // Get a single thought
    getThoughtbyId(req, body) {
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
    createThought(req, body) {
      Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          {_id:req.body.userID},
          {$push:{ thoughts:dbThoughtData._id}},
          {new:true}
        )
      }).catch((err) => res.status(400).json(err));
    },

    // Update a thought
    updateThought(req, body) {
      Thought.findOneAndUpdate({ _id: req.params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserdbThoughtDataData);
      })
      .catch(err => res.status(400).json(err));
    },

    // Remove a thought
    removeThought(req, body) {
      Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            return User.findOneAndUpdate(
              {_id:req.body.userID},
              {$pull:{thoughts:thought._id}},
              {new:true}
            )
        }).then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },

    // Add a reaction to the thought
    addReaction(req, body) {
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
    removeReaction(req, body) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
    }
};

module.exports = ThoughtController;