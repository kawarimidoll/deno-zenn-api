export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  commentsCount: number;
  likedCount: number;
  bodyLettersCount: number;
  readingTime: number;
  articleType: string;
  emoji: string;
  isSuspendingPrivate: boolean;
  publishedAt: Date;
  bodyUpdatedAt: Date;
  sourceRepoUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  bodyHtml?: string;
  ogImageUrl?: string;
  badgeList?: Array<[string, number]>;
  shouldNoindex: boolean;
  isMine: boolean;
  isPreview: boolean;
  currentUserLiked: boolean;
  githubRepository?: string;
  user: ZennUser;
  topics: ZennTopic[];
}
// deno-lint-ignore no-explicit-any
const implementsZennArticle = (object: any): object is ZennArticle =>
  object && typeof object == "object" && typeof object.articleType == "string";

export interface ZennUser {
  id: number;
  username: string;
  name: string;
  avatarSmallUrl: string;
  // detail
  avatarUrl?: string;
  bio?: string;
  autolinkedBio?: string;
  githubUsername?: string;
  twitterUsername?: string;
  isSupportOpen?: boolean;
  tokusyoContact?: string;
  tokusyoName?: string;
  websiteUrl?: string;
  websiteDomain?: string;
  totalLikedCount?: number;
  gaTrackingId?: string;
  followerCount?: number;
  followingCount?: number;
  articlesCount?: number;
  booksCount?: number;
  scrapsCount?: number;
}
// deno-lint-ignore no-explicit-any
const implementsZennUser = (object: any): object is ZennUser =>
  object && typeof object == "object" && typeof object.username == "string";

export interface ZennTopic {
  id: number;
  name: string;
  displayName: string;
  taggingsCount: number;
  imageUrl: string;
  // detail
  articlesCount?: number;
  booksCount?: number;
  scrapsCount?: number;
}
// deno-lint-ignore no-explicit-any
const implementsZennTopic = (object: any): object is ZennTopic =>
  object && typeof object == "object" && typeof object.displayName == "string";

export interface ZennBook {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  price: number;
  isSuspendingPrivate: boolean;
  likedCount: number;
  createdAt: Date;
  publishedAt: Date;
  sourceRepoUpdatedAt?: Date;
  coverImageSmallUrl: string;
  user: ZennUser;
}
// deno-lint-ignore no-explicit-any
const implementsZennBook = (object: any): object is ZennBook =>
  object && typeof object == "object" && typeof object.price == "number";

export interface ZennScrap {
  id: number;
  userId: number;
  slug: string;
  title: string;
  closed: boolean;
  closedAt?: Date;
  archived: boolean;
  likedCount: number;
  canOthersPost: boolean;
  commentsCount: number;
  createdAt: Date;
  lastCommentCreatedAt: Date;
  shouldNoindex: boolean;
  topics: ZennTopic[];
  user: ZennUser;
}

// deno-lint-ignore no-explicit-any
const implementsZennScrap = (object: any): object is ZennScrap =>
  object && typeof object == "object" && typeof object.closed == "boolean";

export {
  implementsZennArticle,
  implementsZennBook,
  implementsZennScrap,
  implementsZennTopic,
  implementsZennUser,
};
