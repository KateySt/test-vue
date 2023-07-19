import {VNode} from "vue";
import {Component, Prop, Vue} from 'vue-facing-decorator';
import {LogUser} from "@/components/interfaces/LogUser";

@Component
export default class UserForm extends Vue {
    @Prop() readonly userProps!: LogUser;

    user = {
        email: '',
        password: ''
    };

    loginUser(event: Event): void {
        event.preventDefault();
        this.$emit('create', this.user);
        this.user.email = '';
        this.user.password = '';
    }

    render(): VNode {
        return (
            <form onSubmit={this.loginUser}>
                <h4>Login: </h4>
                <my-input
                    v-model={this.user.email}
                    type="email"
                    placeholder="email"
                />
                <my-input
                    v-model={this.user.password}
                    type="password"
                    placeholder="password"
                />
                <my-button
                    class="btn"
                    onClick={this.loginUser}
                >
                    Login
                </my-button>
            </form>
        );
    }
}

