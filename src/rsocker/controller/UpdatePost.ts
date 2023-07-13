import {RequestResponse} from "@/rsocker/connection/Connection";
import {Post} from "@/components/interfaces/Post";

export default class UpdatePostController extends RequestResponse<{
    postId: string,
    authorId: string,
    title: string,
    body: string
}, Post> {
    protected readonly route = "changePost"
}
