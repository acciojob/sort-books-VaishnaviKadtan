import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_SORT_BY,
  SET_ORDER
} from "./actionTypes";

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: "title",
  order: "asc"
};

function sortBooks(books, sortBy, order) {
  return [...books].sort((a, b) => {
    const A = a[sortBy].toLowerCase();
    const B = b[sortBy].toLowerCase();

    if (order === "asc") return A > B ? 1 : -1;
    return A < B ? 1 : -1;
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true };

    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };

    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };

    case SET_ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
}

export const selectSortedBooks = (state) =>
  sortBooks(state.books, state.sortBy, state.order);
