import Products from "../Models/schema.js";

export const createProducts = async (req, res) => {
  try {
    const newproduct = new Products(req.body);
    await newproduct.save();
    res.status(200).json({
      message: "Product Created Successfully",
      result: [newproduct],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in create products" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const product = await Products.find();
    res.status(200).json({
      message: "Product Retrieved Successfully",
      result: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in get product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (!product) {
      res.status(404).send("Product Not Found");
    }
    res.status(200).json({
      message: "Product Retrieved Successfully",
      result: product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in getbyid product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      productPrice,
      productImage,
    } = req.body;
    const results = await Products.updateOne(
      { _id: productId },
      {
        productName,
      productPrice,
      productImage,
      }
    );
    if (results.matchedCount === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const updatedproduct = await Products.find({ _id: productId });
    res.status(200).json({
      message: "Product Updated Successfully",
      result: updatedproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in edit Product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProd = await Products.deleteOne({ _id: productId });
    if (!deleteProd) {
      return res.status(404).send("Product Not Found");
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error in Delete Product");
  }
};
