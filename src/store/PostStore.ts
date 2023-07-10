import {defineStore} from 'pinia';
import {Post} from './../components/interfaces/Post';
import {PostState} from './../components/types/PostState';
import {changePost, createPost, posts} from "@/rsocker/rsocket";
import {NewPost} from "@/components/interfaces/NewPost";

export const usePostsStore = defineStore({
    id: "postsStore",
    state: () =>
        ({
            posts: [],
        } as PostState),
    actions: {
        async createPost(userId: string, post: NewPost): Promise<void> {
            await createPost(userId,
                {
                    title: post.title,
                    body: post.body
                })
                .then((response: Post) => {
                    this.posts.unshift(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async updatePost(userId: string, postId: string, post: Post): Promise<void> {
            const index = this.findIndexById(postId);

            await changePost(userId, postId,
                {
                    title: post.title,
                    body: post.body
                })
                .then((response: Post) => {
                    this.posts[index] = response;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        findIndexById(id: string): number {
            return this.posts.findIndex((post: Post) => post.postId === id);
        },
        async getListPost(): Promise<void> {
            await posts()
                .then((response: Post[]) => {
                    this.posts = [...response];
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
});