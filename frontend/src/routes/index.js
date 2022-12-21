export default {
  getNewsListUrl: () => 'https://hacker-news.firebaseio.com/v0/newstories.json',
  getNewsByIdUrl: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
};
