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
  let singleTagData = await Tag.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(singleTagData);
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
  let updatedData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  res.json(updatedData);
});

  // delete tag by id
router.delete('/:id', async (req, res) => {
  let numberOfDeletedEntries = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(numberOfDeletedEntries);
});

module.exports = router;