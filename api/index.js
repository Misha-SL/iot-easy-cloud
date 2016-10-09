import express from 'express';
import tagRepository from '../repositories/tagRepository';
const router = new express.Router();
const collectionName = "tagsCollection";

///tag/123/filter/{"date":{"value1":1475976410411, "value2":1475976531093}}
router.get('/tag/:id/filter/:filters', (req, res) => {
  var filters = JSON.parse(req.params.filters);
  var id = req.params.id;
  console.log("filters:", filters);
  tagRepository.init("./tags");
  let collection = tagRepository.selectAll(collectionName);
  collection = collection.filter(item => item.id == id);
  let func;
  const getter = (item, field) => item[field];
  for (var filterName in filters) {
    const filter = filters[filterName];
    
    //EQUIL
    if (filter.value) {
      func = item => getter(item, filterName) == filter.value;
      collection = collection.filter(func);
    }

    // LESS THEN
    if (filter.value1) {
      func = item => filter.value1 <= getter(item, filterName);
      collection = collection.filter(func);
    }

    // GRATHER THEN
    if (filter.value2) {
      func = item => getter(item, filterName) <= filter.value2;
      collection = collection.filter(func);
    }
    
  }
  console.log("collection:", collection);
  res.json(collection)
})

router.get('/tag/:id/:data', (req, res) => {
  var tags = JSON.parse(req.params.data);
  var data = {
    id: req.params.id,
    date: new Date().getTime(),
    tags: tags,
  }
  console.log(data);
  tagRepository.init("./tags");
  tagRepository.insert(collectionName, data);
  tagRepository.save();
  const collection = tagRepository.selectAll(collectionName);
  console.log(collection.length);
  res.json(collection)
})

export default router;