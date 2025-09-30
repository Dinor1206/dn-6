const { read_file, write_file } = require("../utils/file-manager");
const uuid = require("uuid");

const getAllProducts = async (req, res) => {
  try {
    const products = read_file("products.json");
    res.render("index", { products });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, price } = req.body;

    const products = read_file("products.json");

    products.push({
      id: uuid.v4(),
      title,
      price,
      img: "https://picsum.photos/400/400",
    });

    write_file("products.json", products);
    res.redirect("http://localhost:4001/get_all_products");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = read_file("products.json");
    const foundedProduct = products.find((product) => product.id === id);
    if (!foundedProduct) {
      return res.render("index", { products });
    }
    res.render("details", { foundedProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { title, price } = req.body;

    const products = read_file("products.json");

      const foundedProduct = products.find((product) => product.id === req.params.id);
    if (!foundedProduct) {
      return res.render("index", { products });
    }

    products.forEach((item)=>{
      if(item.id===req.params.id){
        item.title=title?title:item.title
        item.price=price?price:item.price
      }
    })

    write_file("products.json", products);
    res.redirect("http://localhost:4001/get_all_products");

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
     

    const products = read_file("products.json");

      const foundedProduct = products.find((product) => product.id === req.params.id);
    if (!foundedProduct) {
      return res.render("index", { products });
    }

    products.forEach((item,idx)=>{
      if(item.id===req.params.id){
       products.splice(idx,1)
      }
    })

    write_file("products.json", products);
    res.redirect("http://localhost:4001/get_all_products");

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
