import {Post} from '@/components/interfaces/Post';
import {Component, Prop, Vue} from 'vue-facing-decorator';
import {VNode} from 'vue';
import './index.css';

@Component
export default class PostForm extends Vue {
    @Prop() readonly post!: Post;

    newPost = {
        title: '',
        body: '',
    };

    created() {
        if (this.post) {
            this.newPost.title = this.post.title;
            this.newPost.body = this.post.body;
        }
    }

    createPost(event: Event): void {
        event.preventDefault();
        this.$emit('create', this.newPost);
        this.newPost.title = '';
        this.newPost.body = '';
    }

    render(): VNode {
        return (
            <form onSubmit={this.createPost}>
                <h4>Creating post:</h4>
                <my-input
                    vModel={this.newPost.title}
                    type="text"
                    placeholder="title"
                />
                <my-input
                    vModel={this.newPost.body}
                    type="text"
                    placeholder="text"
                />

                <my-button
                    class="btn"
                    type="primary"
                    onClick={this.createPost}>
                    Create
                </my-button>
            </form>
        );
    }
}
