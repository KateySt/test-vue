import {RequestStream} from "@/rsocker/connection/Connection";
import {Post} from "@/components/interfaces/Post";

export default class SubscribePosts extends RequestStream<null, Post> {
    protected readonly route = 'posts'
}