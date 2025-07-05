import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";

export const addProduct = async (req, res) => {
  try {
    const { wishlistId, name, price, imageUrl } = req.body;

    if (!wishlistId || !name || !price || !imageUrl) {
      return res.status(400).json({
        message: "All fields are required: wishlistId, name, price, imageUrl",
      });
    }
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!wishlist.members.includes(req.userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to add products to this wishlist" });
    }

    // create product
    const product = await Product.create({
      wishlistId,
      name: name.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim(),
      addedBy: req.userId,
    });

    await product.populate("addedBy", "username email");

    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProductsByWishlist = async (req, res) => {
  const { wishlistId } = req.params;
  if (!wishlistId) {
    return res.status(400).json({ message: "Wishlist ID is required" });
  }

  try {
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // find all products that belong  wishlist
    const products = await Product.find({ wishlistId: wishlistId })
      .populate("addedBy", "username")
      .populate("comments.commentedBy", "username")
      .sort({ createdAt: -1 });
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, imageUrl } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the owner
    if (product.addedBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own products" });
    }

    // Update fields
    if (name !== undefined) product.name = name.trim();
    if (price !== undefined) product.price = Number(price);
    if (imageUrl !== undefined) product.imageUrl = imageUrl.trim();

    await product.save();

    // Populate user data
    await product.populate("addedBy", "username email");
    await product.populate("comments.commentedBy", "username email");

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the owner
    if (product.addedBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own products" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// add comment to a product
export const addCommentToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is a member of the wishlist
    const wishlist = await Wishlist.findById(product.wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!wishlist.members.includes(req.userId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to comment on this wishlist" });
    }

    // Add comment
    const comment = {
      text: text.trim(),
      commentedBy: req.userId,
      createdAt: new Date(),
    };

    product.comments.push(comment);
    await product.save();

    // Populate the comments with user data
    await product.populate("comments.commentedBy", "username email");

    res.status(200).json(product.comments);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
