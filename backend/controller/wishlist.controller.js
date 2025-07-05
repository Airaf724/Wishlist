import { Wishlist } from "../models/wishlist.model.js";

export const createWishlist = async (req, res) => {
  const wishlist = await Wishlist.create({
    title: req.body.title,
    createdBy: req.userId,
    members: [req.userId],
  });
  res.status(201).json(wishlist);
};

export const getAllWishlists = async (req, res) => {
  const wishlists = await Wishlist.find({ members: req.userId }).populate(
    "createdBy",
    "username"
  );
  res.json(wishlists);
};

export const getWishlistById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Wishlist ID is required" });
  }

  try {
    const wishlist = await Wishlist.findById(id);
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    if (!wishlist.members.includes(req.userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateWishlist = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.userId;
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title cannot be empty" });
  }

  try {
    const wishlist = await Wishlist.findById(id);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (wishlist.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this wishlist" });
    }

    wishlist.title = title.trim();
    await wishlist.save();

    res.status(200).json({
      message: "Wishlist updated successfully",
      title: wishlist.title,
    });
  } catch (err) {
    console.error("Update wishlist error:", err);
    res.status(500).json({ message: "Server error while updating wishlist" });
  }
};

export const deleteWishlist = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist) return res.status(404).json({ message: "Not found" });

  if (wishlist.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Only the creator can delete" });
  }

  await wishlist.deleteOne();
  res.json({ message: "Wishlist deleted" });
};

export const inviteUser = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist) return res.status(404).json({ message: "Not found" });

  if (wishlist.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Only creator can invite" });
  }

  if (!wishlist.members.includes(req.body.userId)) {
    wishlist.members.push(req.body.userId);
    await wishlist.save();
  }

  res.json({ message: "User invited successfully" });
};
