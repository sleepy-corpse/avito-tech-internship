export default {
  getNewsListUrl: () => 'https://hacker-news.firebaseio.com/v0/newstories.json',
  getItemByIdUrl: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
};
