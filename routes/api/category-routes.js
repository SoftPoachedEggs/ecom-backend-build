const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll();
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json("could not get categories", err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const user = await Category.findOne({
      where: {
        category_id: req.body.category_id,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "Category ID not found!" });
  }
});
router.post('/', async (req, res) => {
  // create a new category
    try {
    await Category.create({
      category_id: req.session.category_id,
      category_name: req.body.category_name,
    });
    res.status(200).json("activity created");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const response = await Category.update(req.body, {
      where: {
        category_id: req.session.category_id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const response = await Category.destroy({
      where: {
        category_id: req.session.category_id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
