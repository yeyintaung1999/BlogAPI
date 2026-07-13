// modules/post/repositories/interfaces/IPostRepository.ts

import type { Post } from "../../types/post.types";

export interface IPostRepository {
  create(post: Post): Promise<Post>;

  getByKey(key: Record<string, unknown>): Promise<Record<string, any> | undefined>;

  getall(): Promise<Post[]>;
}