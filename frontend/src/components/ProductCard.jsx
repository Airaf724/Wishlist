/* eslint-disable react/prop-types */

const ProductCard = ({
  product,
  currentUserId,
  isLoading,
  commentMap,
  openComments,
  onCommentChange,
  onCommentSubmit,
  onEdit,
  onDelete,
  onToggleComments,
}) => {
  const isOwner =
    product.addedBy === currentUserId || product.addedBy?._id === currentUserId;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 space-y-3 hover:shadow-lg transition-shadow overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-36 sm:h-40 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-green-600">₹{product.price}</p>
        <p className="text-xs text-gray-500 mt-1">
          Added by: {product.addedBy?.username || "Unknown"}
        </p>
      </div>

      {/* Conditional Edit/Delete - Only show if user is the owner */}
      {isOwner && (
        <div className="flex gap-2 pt-2 border-t">
          <button
            onClick={() => onEdit(product)}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      )}

      {/* Comments Toggle Button */}
      <div className="mt-4 pt-3 border-t">
        <button
          onClick={() => onToggleComments(product._id)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-2 w-full justify-between"
        >
          <span>Comments ({product.comments?.length || 0})</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              openComments[product._id] ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {openComments[product._id] && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentMap[product._id] || ""}
                onChange={(e) => onCommentChange(product._id, e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onCommentSubmit(product._id);
                  }
                }}
              />
              <button
                onClick={() => onCommentSubmit(product._id)}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-black transition-colors whitespace-nowrap flex-shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!commentMap[product._id]?.trim()}
              >
                Post
              </button>
            </div>

            {product.comments?.length > 0 && (
              <div className="space-y-2 max-h-28 sm:max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-50">
                {product.comments.map((comment, i) => (
                  <div key={i} className="text-sm bg-white p-2 rounded border">
                    <span className="font-medium text-gray-800 break-words">
                      {comment.commentedBy?.username || "User"}:
                    </span>{" "}
                    <span className="text-gray-700 break-words">
                      {comment.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
