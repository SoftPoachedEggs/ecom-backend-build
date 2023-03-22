const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll();
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json("Could not get all tags", err);
  }
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product datary
  try {
    const findTagID = await Product.findOne({
      where: {
        tag_id: req.body.tag_id,
      },
    });
    res.status(200).json(findTagID);
  } catch (err) {
    res.status(400).json({ message: "Tag ID not found!" });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    });

    console.log("This is new product", newTag);
    // res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const productTagIds = productTags.map(({ tag_id }) => tag_id);
  // create filtered list of new tag_ids
  const newProductTags = req.body.tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
  // figure out which ones to remove
  const productTagsToRemove = productTags
    .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    .map(({ id }) => id);

  // run both actions
  return Promise.all([
    ProductTag.destroy({ where: { id: productTagsToRemove } }),
    ProductTag.bulkCreate(newProductTags),
  ]);
})
.then((updatedProductTags) => res.json(updatedProductTags))
.catch((err) => {
  // console.log(err);
  res.status(400).json(err);
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
