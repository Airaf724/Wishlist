import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/wishlists"
    : "/api/wishlists";

axios.defaults.withCredentials = true;

export const useWishlistStore = create((set) => ({
  wishlists: [],
  wishlist: null,
  isLoading: false,
  error: null,

  createWishlist: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}`, { title });
      set((state) => ({
        wishlists: [...state.wishlists, response.data],
        isLoading: false,
      }));
    } catch (e) {
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error creating wishlist",
      });
    }
  },

  fetchWishlists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({
        wishlists: response.data,
        isLoading: false,
      });
    } catch (e) {
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error fetching wishlists",
      });
    }
  },

  fetchWishlistById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({
        wishlist: response.data,
        isLoading: false,
      });
    } catch (e) {
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error fetching wishlist",
      });
    }
  },

  updateWishlist: async (id, newTitle) => {
    set({ isLoading: true, error: null });
    console.log("new", newTitle);
    try {
      const response = await axios.put(`${API_URL}/${id}`, { title: newTitle });
      set((state) => ({
        wishlists: state.wishlists.map((w) =>
          w._id === id ? { ...w, title: response.data.title } : w
        ),
        isLoading: false,
      }));
    } catch (e) {
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error updating wishlist",
      });
    }
  },

  deleteWishlist: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        wishlists: state.wishlists.filter((w) => w._id !== id),
        isLoading: false,
      }));
    } catch (e) {
      set({
        isLoading: false,
        error: e.response?.data?.message || "Error deleting wishlist",
      });
    }
  },
}));
