import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

let storedFavourite = localStorage.getItem("article")
// console.log(JSON.parse(storedFavourite))

export const fetchNewsData = createAsyncThunk('news/fetchNewsData', async (query) => {
  const response = await fetch(`https://newsapi.org/v2/${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  return data.articles.map(article => ({ ...article, favourite: false }));
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsData: [],
    favouriteData: storedFavourite ? [...JSON.parse(storedFavourite)] : [],
    query: 'top-headlines?country=in',
    sidebar: false,
  },
  reducers: {
    setfavouriteData: (state, action) => {
      if (action.payload.operation == "append") {
        state.favouriteData.push(action.payload.datas);
        localStorage.setItem("article", JSON.stringify(state.favouriteData))
      } else {
        // console.log("delete")
        const dataToDelete = action.payload.datas;
        state.favouriteData = state.favouriteData.filter(item => item.title !== dataToDelete.title);
        localStorage.setItem("article", JSON.stringify(state.favouriteData))
      }
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.newsData = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});

export const { setQuery, setSidebar, favouriteData, setfavouriteData } = newsSlice.actions;
export default newsSlice.reducer;
