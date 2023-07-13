/*
async function connect() {
    const transportOptions = {
        url: 'ws://localhost:7000/rsocket',
        wsCreator: (url: string) => {
            return new WebSocket(url);
        },
    };
    const setup = {
        keepAlive: 1000000,
        lifetime: 100000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
    };
    const transport = new RSocketWebsocketClient(transportOptions);
    const client = new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer
        }, setup, transport
    });
    return await client.connect();
}

export async function registration(user: NewUser): Promise<Profile> {
    const rsocket = await connect();

    return new Promise((resolve, reject) => {
        return rsocket.requestResponse({
            data: {
                userName: user.userName,
                email: user.email,
                password: user.password
            },
            metadata: String.fromCharCode('/registration'.length) + '/registration',

        }).subscribe({
            onComplete: (response) => {
                resolve(response.data);
            },
            onError: (error) => {
                reject(error);
            },
        });
    })
}

export async function login(user: LogUser): Promise<Profile> {
    const rsocket = await connect();

    return new Promise((resolve, reject) => {
        rsocket.requestResponse({
            data: {
                email: user.email,
                password: user.password
            },
            metadata: String.fromCharCode('/login'.length) + '/login',

        }).subscribe({
            onComplete: (response) => {
                resolve(response.data);
            },
            onError: (error) => {
                reject(error);
            },
        });
    })
}

export async function posts(): Promise<Post[]> {
    const rsocket = await connect();
    const dataArray: Post[] = [];

    return new Promise((resolve, reject) => {
        rsocket.requestStream({
            data: {},
            metadata: String.fromCharCode('/posts'.length) + '/posts',
        }).subscribe({
            onComplete: () => {
                resolve(dataArray);
            },
            onNext: (payload) => {
                dataArray.push(payload.data);
            },
            onError: (error) => {
                reject(error);
            },
            onSubscribe: subscription => {
                subscription.request(100);
            },
        });
    });
}

export async function createPost(id: string, post: NewPost): Promise<Post> {
    const rsocket = await connect();

    return new Promise((resolve, reject) => {
        rsocket.requestResponse({
            data: {
                title: post.title,
                body: post.body,
            },
            metadata: String.fromCharCode(`/users/${id}/posts`.length) + `/users/${id}/posts`,

        }).subscribe({
            onComplete: (response) => {
                resolve(response.data);
            },
            onError: (error) => {
                reject(error);
            },
        });
    })
}

export async function changePost(userId: string, postId: string, post: NewPost): Promise<Post> {
    const rsocket = await connect();

    return new Promise((resolve, reject) => {
        rsocket.requestResponse({
            data: {
                title: post.title,
                body: post.body
            },
            metadata: String.fromCharCode(`/users/${userId}/posts/${postId}`.length)
                + `/users/${userId}/posts/${postId}`,
        }).subscribe({
            onComplete: (response) => {
                resolve(response.data);
            },
            onError: (error) => {
                reject(error);
            },
        });
    })
}

 */