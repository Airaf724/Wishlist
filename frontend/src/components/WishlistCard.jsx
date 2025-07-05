/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import { Users, Calendar, User, Edit2, Trash2 } from "lucide-react";
import EditWishlistDialog from "./EditWishlistDialog";

const WishlistCard = ({ wishlist }) => {
  const { user } = useAuthStore();
  const { deleteWishlist, updateWishlist } = useWishlistStore();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const isOwner = user?._id === wishlist.createdBy?._id;

  const handleCardClick = () => {
    navigate(`/wishlist/${wishlist._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this wishlist?"
    );
    if (!confirmDelete) return;

    try {
      await deleteWishlist(wishlist._id);
      alert("Wishlist deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete wishlist.");
    }
  };

  const handleEditSubmit = async (newTitle) => {
    try {
      await updateWishlist(wishlist._id, newTitle);
      setIsEditOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-white"
      >
        <div className="flex justify-between items-start">
          <div className="font-semibold text-lg">{wishlist.title}</div>
          {isOwner && (
            <div className="text-sm text-green-600 font-medium ml-2">Owner</div>
          )}
        </div>

        <div className="text-sm text-gray-600 mt-1">
          <User size={14} className="inline mr-1" />
          Created by: {wishlist.createdBy?.username || "Unknown"}
        </div>

        <div className="text-sm text-gray-600 mt-1">
          <Users size={14} className="inline mr-1" />
          {wishlist.members?.length || 0} member
          {wishlist.members?.length !== 1 ? "s" : ""}
        </div>

        <div className="text-sm text-gray-600 mt-1">
          <Calendar size={14} className="inline mr-1" />
          Created: {formatDate(wishlist.createdAt)}
        </div>

        <div className="text-sm text-blue-600 mt-3">Click to view products</div>

        {isOwner && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditOpen(true);
              }}
              className="p-1 rounded hover:bg-gray-100"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded hover:bg-gray-100 text-red-500"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <EditWishlistDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialTitle={wishlist.title}
      />
    </>
  );
};

export default WishlistCard;
