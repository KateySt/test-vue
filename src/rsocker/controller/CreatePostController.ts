import {RequestResponse} from "@/rsocker/connection/Connection";
import {Post} from "@/components/interfaces/Post";

export default class CreatePostController extends RequestResponse<{
    authorId: string,
    title: string,
    body: string
}, Post> {
    protected readonly route = "createPost"
}

