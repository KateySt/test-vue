import {defineStore} from 'pinia';
import {Post} from './../components/interfaces/Post';
import {PostState} from './../components/types/PostState';
import {WS} from "@/rsocker";
import SubscribePosts from "@/rsocker/controller/SubscribePosts";
import CreatePostController from "@/rsocker/controller/CreatePostController";
import UpdatePostController from "@/rsocker/controller/UpdatePost";
import {NewPost} from "@/components/interfaces/NewPost";
import {useUserStore} from "@/store/UserStore";

export const usePostsStore = defineStore({
    id: "postsStore",
    state: () =>
        ({
            posts: [],
        } as PostState),
    actions: {
        async createPost(post: NewPost): Promise<void> {
            WS.setBearerAuthentication(useUserStore().profile.token)
            await WS.process(CreatePostController, {
                authorId: post.authorId,
                title: post.title,
                body: post.body
            }).then(post => {
                this.posts.unshift(post);
            }).catch((error) => {
                console.error(error);
            });
        },
        async updatePost(post: Post): Promise<void> {
            const index = this.findIndexById(post.postId);
            WS.setBearerAuthentication(useUserStore().profile.token)
            await WS.process(UpdatePostController, {
                postId: post.postId,
                authorId: post.userId,
                title: post.title,
                body: post.body
            }).then(post => {
                this.posts[index] = post;
            }).catch((error) => {
                console.error(error);
            });
        },
        findIndexById(id: string): number {
            return this.posts.findIndex((post: Post) => post.postId === id);
        },
        async getListPost(): Promise<void> {
            this.posts = []
            await WS.process(SubscribePosts, null, data => {
                if (!data._isComplete) {
                    this.posts.push(data);
                }
            })
                .then(requester => requester.request(100000))
                .catch((error) => {
                    console.error(error);
                });
        },
    },
});