const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const caterories = await Category.findAll({
    include: [{model: Product}]
  })

  res.status(200).json(caterories)
  
  console.log(caterories)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id, {
    include: [{model:Product}]
  });

  res.status(200).json(category)
  

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body)
  // create a new category
});

router.put('/:id', async (req, res) => {
  const updated = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleted = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
});

module.exports = router;
