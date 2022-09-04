const router = require('express').Router();
const {
    getAllThought,
    getThoughtbyId,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

//  /api/thoughts
router.route('/')
  .get(getAllThought)
  .post(createThought);

//  /api/thoughts/:id
router.route('/:id')
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:thoughtId>/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

// /api/thoughts/:thoughtId>/reactions
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;