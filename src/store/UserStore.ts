import {defineStore} from "pinia";
import {NewUser} from "@/components/interfaces/NewUser";
import {LogUser} from "@/components/interfaces/LogUser";
import {Profile} from "@/components/interfaces/Profile";
import {WS} from "@/rsocker";
import RegistUserController from "@/rsocker/controller/RegistUserController";
import LoginController from "@/rsocker/controller/LoginController";

export const useUserStore = defineStore({
    id: "userStore",
    state: () =>
        ({
            profile: JSON.parse(localStorage.getItem("userProfile") || "{}") as Profile,
        }),
    actions: {
        async registration(user: NewUser): Promise<void> {
            if (!user) return;

            await WS.process(RegistUserController, {
                userName: user.userName,
                email: user.email,
                password: user.password
            }).then(user => {
                this.profile = user;
                localStorage.setItem("userProfile", JSON.stringify(user));
            }).catch((error) => {
                console.error(error);
            });
        },
        async login(user: LogUser): Promise<void> {
            if (!user) return;

            await WS.process(LoginController, {
                email: user.email,
                password: user.password
            }).then(user => {
                this.profile = user;
                localStorage.setItem("userProfile", JSON.stringify(user));
            }).catch((error) => {
                console.error(error);
            });
        },
        logout(): void {
            this.profile = {} as Profile;
            localStorage.removeItem("userProfile");
        }
    },
});