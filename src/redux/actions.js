import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_SORT_BY,
  SET_ORDER
} from "./actionTypes";

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });

  try {
    const res = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY"
    );

    const data = await res.json();

    const books = data.results.books.map((b) => ({
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      isbn: b.primary_isbn13
    }));

    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
  } catch (err) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: err.message });
  }
};

export const setSortBy = (value) => ({
  type: SET_SORT_BY,
  payload: value
});

export const setOrder = (value) => ({
  type: SET_ORDER,
  payload: value
});
