import {defineStore} from "pinia";
import {login, registration} from "@/rsocker/rsocket";
import {NewUser} from "@/components/interfaces/NewUser";
import {LogUser} from "@/components/interfaces/LogUser";
import {UserId} from "@/components/interfaces/UserId";

export const useUserStore = defineStore({
    id: "userStore",
    state: () =>
        ({
            profile: {} as UserId,
        }),
    actions: {
        async registration(user: NewUser): Promise<void> {
            if (!user) return;

            await registration({
                name: user.name,
                email: user.email,
                password: user.password
            }).then((response: any) => {
                this.profile = response.userId;
            }).catch((error) => {
                console.error(error);
            });
        },
        async login(user: LogUser): Promise<void> {
            if (!user) return;

            await login({
                email: user.email,
                password: user.password
            }).then((response: any) => {
                this.profile = response.userId;
            }).catch((error) => {
                console.error(error);
            });
        },
        logout(): void {
            this.profile = {id: ""}
            console.error(this.profile);
        }
    },
});