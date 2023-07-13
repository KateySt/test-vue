import {RequestResponse} from "@/rsocker/connection/Connection";
import {Profile} from "@/components/interfaces/Profile";

export default class LoginController extends RequestResponse<{
    email: string,
    password: string,
}, Profile> {
    protected readonly route = "login"
}