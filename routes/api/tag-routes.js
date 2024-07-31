const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll();
    if (!allTags) {
      res.status(200).send('no tags at this time')
    }
    else {
      res.status(200).json(allTags)
      console.log('here are all tags')
    }
  }
  catch (err) {
    console.log(err)
  }

  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const thisTag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag
      }
    })
    if (thisTag == null) {
      res.status(200).json('no tag with that id')
    }
    else {
      console.log(`here is tag ${req.params.id}`);
      res.status(200).json(thisTag)
    }
  }
  catch (err) {
    console.log(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  }
  catch (err) { console.log(err) }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const currentTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (currentTag == 0){
      res.status(200).json('no tag with that ID')
    }
    else{
      res.status(200).json('tag has been updated')
    }
  }

  catch (err) {
  console.log(err)
}
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  if (deletedTag) {
    res.status(200).json('tag deleted')
  }
  else{
    res.status(200).json('no tag to delete with that ID')
  }
});

module.exports = router;
