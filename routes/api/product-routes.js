const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  const allProducts = await Product.findAll().catch((err) => {
    res.json(err);
  });
  res.json(allProducts);
});

// get one product
router.get('/:id', async (req, res) => { 
    const oneProduct = await Product.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(oneProduct);
});

// create new product
router.post('/', async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list
      const productByTagId = productTags.map(({ tag_id }) => tag_id);
      // filter list
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productByTagId.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
        const deleteProductTag = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: deleteProductTag } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedTags) => res.json(updatedTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

  // delete a product by id
router.delete('/:id', async (req, res) => {
  let numberOfDeletedEntries = await Product.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(numberOfDeletedEntries);
});

module.exports = router;