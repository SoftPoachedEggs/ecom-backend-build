const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  let tagData = await Tag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

//get tag by id
router.get('/:id', async (req, res) => {
  let tagByID = await Tag.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(tagByID);
});

// create a new tag
router.post('/', async (req, res) => {
  let newTag = await Tag.create(req.body).catch((err) => {
    res.json(err);
  })
  res.json(newTag);
});

  // update a tag name by id
router.put('/:id', async (req, res) => {
  let updatedID = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  res.json(updatedID);
});

  // delete tag by id
router.delete('/:id', async (req, res) => {
  let deletedbyID = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(deletedbyID);
});

module.exports = router;