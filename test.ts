import { assert } from "./api/deps.ts";
import {
  implementsZennArticle,
  implementsZennBook,
  implementsZennScrap,
  implementsZennTopic,
  implementsZennUser,
  zennApi,
} from "./mod.ts";

Deno.test("Top page", async () => {
  const result = await zennApi();

  const { dailyTechArticles, dailyIdeaArticles, dailyBooks } = result;
  assert(implementsZennArticle(dailyTechArticles[0]));
  assert(implementsZennArticle(dailyIdeaArticles[0]));
  assert(implementsZennBook(dailyBooks[0]));
});

Deno.test("User page", async () => {
  const result = await zennApi("kawarimidoll");
  // console.log(Object.keys(result));
  const { articles, user } = result;
  assert(implementsZennArticle(articles[0]));
  assert(implementsZennUser(user));
});

Deno.test("Articles page", async () => {
  const result = await zennApi("articles");
  assert(implementsZennArticle(result.articles[0]));
});

Deno.test("Articles/explore page", async () => {
  const result = await zennApi("articles/explore");

  const {
    weeklyTechArticles,
    alltimeTechArticles,
    weeklyIdeaArticles,
    alltimeIdeaArticles,
    randomFeaturedArticles,
    newArticles,
    popularTopics,
  } = result;
  assert(implementsZennArticle(weeklyTechArticles[0]));
  assert(implementsZennArticle(alltimeTechArticles[0]));
  assert(implementsZennArticle(weeklyIdeaArticles[0]));
  assert(implementsZennArticle(alltimeIdeaArticles[0]));
  assert(implementsZennArticle(randomFeaturedArticles[0]));
  assert(implementsZennArticle(newArticles[0]));
  assert(implementsZennTopic(popularTopics[0]));
});

Deno.test("Specific Article page", async () => {
  const result = await zennApi("kawarimidoll/articles/2937f4da6d9fa8");
  assert(implementsZennArticle(result.article));
});

Deno.test("Books page", async () => {
  const result = await zennApi("books");
  assert(implementsZennBook(result.books[0]));
});

Deno.test("Books/explore page", async () => {
  const result = await zennApi("books/explore");

  const {
    randomFeaturedBooks,
    freeBooks,
    alltimeBooks,
    dailyBooks,
  } = result;
  assert(implementsZennBook(randomFeaturedBooks[0]));
  assert(implementsZennBook(freeBooks[0]));
  assert(implementsZennBook(alltimeBooks[0]));
  assert(implementsZennBook(dailyBooks[0]));
});

Deno.test("Scraps page", async () => {
  const result = await zennApi("scraps");
  assert(implementsZennScrap(result.scraps[0]));
});

Deno.test("Scraps/explore page", async () => {
  const result = await zennApi("scraps/explore");

  const {
    dailyScraps,
    alltimeScraps,
    recentScraps,
  } = result;
  assert(implementsZennScrap(dailyScraps[0]));
  assert(implementsZennScrap(alltimeScraps[0]));
  assert(implementsZennScrap(recentScraps[0]));
});

Deno.test("Topics page", async () => {
  const result = await zennApi("topics");
  assert(implementsZennTopic(result.topics[0]));
});

Deno.test("Topics/zenn page", async () => {
  const result = await zennApi("topics/zenn");
  const {
    topic,
    articles,
  } = result;
  assert(implementsZennTopic(topic));
  assert(implementsZennArticle(articles[0]));
});

Deno.test("Topics/zenn/books page", async () => {
  const result = await zennApi("topics/zenn/books");
  const {
    topic,
    books,
  } = result;
  assert(implementsZennTopic(topic));
  assert(implementsZennBook(books[0]));
});

// Deno.test("Search page", async () => {
//   assert(true);
// });
