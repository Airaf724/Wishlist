import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import AddProductDialog from "../components/AddProductDialog";
import InviteDialog from "../components/InviteDialog";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { id } = useParams();
  const { fetchWishlistById, wishlist } = useWishlistStore();
  const {
    fetchProducts,
    products,
    addProduct,
    commentOnProduct,
    updateProduct,
    deleteProduct,
    isLoading,
  } = useProductStore();
  const { user } = useAuthStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [commentMap, setCommentMap] = useState({});
  const [openComments, setOpenComments] = useState({});

  console.log(products);

  useEffect(() => {
    if (id) {
      fetchWishlistById(id);
      fetchProducts(id);
    }
  }, [id]);

  const handleCommentChange = (productId, value) => {
    setCommentMap({ ...commentMap, [productId]: value });
  };

  const handleCommentSubmit = async (productId) => {
    if (!commentMap[productId]?.trim()) return;
    await commentOnProduct(productId, commentMap[productId]);
    setCommentMap((prev) => ({ ...prev, [productId]: "" }));
  };

  const handleAddProduct = async (data) => {
    const result = await addProduct({ ...data, wishlistId: id });
    if (result.success) {
      setIsAddOpen(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const handleUpdateProduct = async (data) => {
    if (!editingProduct) return;

    const result = await updateProduct(editingProduct._id, data);
    if (result.success) {
      setIsEditOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(productId);
      if (result.success) {
        console.log("Product deleted successfully");
      }
    }
  };

  const handleToggleComments = (productId) => {
    setOpenComments((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pb-24">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {wishlist?.title || "Wishlist"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsInviteOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Invite
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products in this wishlist yet.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Click "Add Product" to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                currentUserId={user?._id}
                isLoading={isLoading}
                commentMap={commentMap}
                openComments={openComments}
                onCommentChange={handleCommentChange}
                onCommentSubmit={handleCommentSubmit}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onToggleComments={handleToggleComments}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddProductDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddProduct}
        isEditing={false}
      />

      <AddProductDialog
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        onSubmit={handleUpdateProduct}
        initialData={editingProduct}
        isEditing={true}
      />

      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </div>
  );
};

export default WishlistPage;
