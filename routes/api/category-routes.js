const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const caterories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(caterories)
  }
  catch (err) {
    res.status(400).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id, {
      include: [{ model: Product }]
    });

    if(!category){
      res.status(200).json('no category with that ID')
    }
    else{
    res.status(200).json(category)
    }
  }
  catch (err) {
    res.status(400).json(err)
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
  const newCategory = await Category.create(req.body)
  if (newCategory){
    res.status(200).json(newCategory)
  }
  else{
    res.status(400).json('unable to add category')
  }
  }
  catch(err){
    res.status(400).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
  const updated = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  if(updated){
    res.status(200).json(updated)
  }
  }
  catch(err){
    res.status(400).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const deleted = await Category.destroy({
    where: {
      id: req.params.id
    }
  })

  if(deleted){
    res.status(200).json('category has been deleted')
  }
}
catch(err){
  res.status(400).json(err)
}
});

module.exports = router;
