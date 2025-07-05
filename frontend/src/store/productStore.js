import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/products"
    : "/api/products";

axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (wishlistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${wishlistId}`);
      set({ products: response.data.products, isLoading: false });
    } catch (e) {
      console.error("API Error:", e.response?.data);
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error fetching products",
      });
    }
  },

  addProduct: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}`, data);
      set((state) => ({
        products: [...state.products, response.data],
        isLoading: false,
      }));
      return { success: true, data: response.data };
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Error adding product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  updateProduct: async (productId, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${productId}`, data);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? response.data : p
        ),
        isLoading: false,
      }));
      return { success: true, data: response.data };
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Error updating product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${productId}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        isLoading: false,
      }));
      return { success: true };
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Error deleting product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  commentOnProduct: async (productId, text) => {
    try {
      const response = await axios.post(`${API_URL}/comment/${productId}`, {
        text,
      });

      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, comments: response.data } : p
        ),
      }));
      return { success: true, data: response.data };
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Failed to add comment";
      console.error("Failed to comment:", e);
      return { success: false, error: errorMessage };
    }
  },

  clearError: () => set({ error: null }),
}));
