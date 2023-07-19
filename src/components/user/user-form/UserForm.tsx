import {VNode} from "vue/dist/vue";
import {Component, Prop, Vue} from 'vue-facing-decorator';
import {NewUser} from "@/components/interfaces/NewUser";

@Component
export default class UserForm extends Vue {
    @Prop() readonly userProps!: NewUser;

    user = {
        userName: '',
        email: '',
        password: ''
    };

    createUser(event: Event): void {
        event.preventDefault();
        this.$emit('create', this.user);
        this.user.userName = '';
        this.user.email = '';
        this.user.password = '';
    }

    render(): VNode {
        return (
            <form onSubmit={this.createUser}>
                <h4>Creating user: </h4>
                <my-input
                    vModel={this.user.userName}
                    type="text"
                    placeholder="name"
                />
                <my-input
                    vModel={this.user.email}
                    type="email"
                    placeholder="email"
                />
                <my-input
                    vModel={this.user.password}
                    type="password"
                    placeholder="password"
                />
                <my-button
                    class="btn"
                    onClick={this.createUser}>
                    Registration
                </my-button>
            </form>
        );
    }
}
