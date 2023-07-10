import {defineStore} from "pinia";
import {login, registration} from "@/rsocker/rsocket";
import {NewUser} from "@/components/interfaces/NewUser";
import {LogUser} from "@/components/interfaces/LogUser";
import {Profile} from "@/components/interfaces/Profile";

export const useUserStore = defineStore({
    id: "userStore",
    state: () =>
        ({
            profile: {} as Profile,
        }),
    actions: {
        async registration(user: NewUser): Promise<void> {
            if (!user) return;

            await registration({
                userName: user.userName,
                email: user.email,
                password: user.password
            }).then((response: Profile) => {
                this.profile = response;
            }).catch((error) => {
                console.error(error);
            });
        },
        async login(user: LogUser): Promise<void> {
            if (!user) return;

            await login({
                email: user.email,
                password: user.password
            }).then((response: Profile) => {
                this.profile = response;
            }).catch((error) => {
                console.error(error);
            });
        },
        logout(): void {
            this.profile = {} as Profile;
        }
    },
});