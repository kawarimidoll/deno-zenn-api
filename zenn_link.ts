import { ZENN_ROOT } from "./zenn_api.ts";
import {
  implementsZennArticle,
  implementsZennBook,
  implementsZennTopic,
  implementsZennUser,
  ZennArticle,
  ZennBook,
  ZennScrap,
  ZennTopic,
  ZennUser,
} from "./types.ts";

const zennLink = (
  object: ZennArticle | ZennBook | ZennScrap | ZennUser | ZennTopic,
): string => {
  if (!object) {
    return ZENN_ROOT;
  }

  if (implementsZennUser(object)) {
    return ZENN_ROOT + object.username;
  }

  if (implementsZennTopic(object)) {
    return ZENN_ROOT + object.name;
  }

  const username = object.user.username;

  const resourceName = implementsZennArticle(object)
    ? "/articles/"
    : implementsZennBook(object)
    ? "/book/"
    : "/scrap/";

  return ZENN_ROOT + username + resourceName + object.slug;
};

export { zennLink };
