export type PostFeedOptions = {
  userId: string | undefined;
  username: string | undefined;
};

export type PostDetailOptions = {
  postId: number;
  userId?: string;
};

export const postKeys = {
  all: [{ entity: 'posts' }] as const,
  feed: (options?: PostFeedOptions) => [{ ...postKeys.all[0], scope: 'feed', ...options }] as const,
  profile: (username: string) => [{ ...postKeys.all[0], scope: 'profile', username }] as const,
  detail: (options: PostDetailOptions) =>
    [{ ...postKeys.all[0], scope: 'detail', ...options }] as const,
  comment: (postId: number) => [{ ...postKeys.all[0], scope: 'comments', postId }] as const,
};

export type ProfileDetailOptions = {
  followedUsername: string | undefined;
  followerUsername: string | undefined;
};

export const profileKeys = {
  all: [{ entity: 'profile' }] as const,
  suggestion: (username?: string) =>
    [{ ...profileKeys.all[0], scope: 'suggestions', username }] as const,
  detail: (options: ProfileDetailOptions) =>
    [{ ...profileKeys.all[0], scope: 'detail', ...options }] as const,
  edit: (username: string | undefined) =>
    [{ ...profileKeys.all[0], scope: 'edit', username }] as const,
  follow: (scope: 'followers' | 'following', username: string) =>
    [{ ...profileKeys.all[0], scope, username }] as const,
};
