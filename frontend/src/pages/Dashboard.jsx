import { useEffect, useState } from "react";
import { useWishlistStore } from "../store/wishlistStore";
import WishlistCard from "../components/WishlistCard";
import { Plus } from "lucide-react";
import CreateWishlistDialog from "../components/CreateWishlistDialog";

const Dashboard = () => {
  const { wishlists, fetchWishlists, createWishlist, isLoading, error } =
    useWishlistStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleCreateWishlist = (title) => {
    createWishlist(title).then(() => {
      setIsDialogOpen(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Your Wishlists</h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading wishlists...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : wishlists.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg">No wishlists yet.</p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Create Your First Wishlist
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => (
              <WishlistCard key={wishlist._id} wishlist={wishlist} />
            ))}

            <div className="col-span-1 flex justify-end">
              <div
                onClick={() => setIsDialogOpen(true)}
                className="w-full cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center justify-center border-dashed border-2 border-green-400"
              >
                <Plus className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-green-500 font-medium">
                  Create New Wishlist
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialog */}
      <CreateWishlistDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateWishlist}
      />
    </div>
  );
};

export default Dashboard;
