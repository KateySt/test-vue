import {RequestResponse} from "@/rsocker/connection/Connection";
import {Profile} from "@/components/interfaces/Profile";

export default class RegistUserController extends RequestResponse<{
    userName: string,
    email: string,
    password: string,
}, Profile> {
    protected readonly route = "registration"
}