const Product = require('../models/productModel');

// create
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// get all 
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// get one
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'product not found' });
  }

  res.json(product);
};


// update
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// delete
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'product deleted' });
};
