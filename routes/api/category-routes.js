const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll().catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

// find a category by id
router.get('/:id', async (req, res) => {
  const singleTagData = await Category.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(singleTagData);
});

// create a new category
router.post('/', async (req, res) => {
  let newCategory = await Category.create(req.body).catch((err) => {
    res.json(err);
  })
  res.json(newCategory); 
});

// update a category by id
router.put('/:id', async (req, res) => {
  let updatedData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updatedData);
});

// delete a category by id
router.delete('/:id', async (req, res) => {
  let numberOfDeletedEntries = await Category.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(numberOfDeletedEntries);
});

module.exports = router;