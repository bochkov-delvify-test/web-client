import { notifications } from '@mantine/notifications';

const Domain = 'http://localhost:8080';
const ApiVersion = '/api/v1';

const headers = {
    'Content-Type': 'application/json',
};

type ApiProps = {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    url: string;
    body: BodyInit | null | undefined;
};

type ValidationError = {
    loc: string[];
    msg: string;
    type: string;
};

export type ApiError = {
    status: 'error';
    detail: string | ValidationError[];
};

const notifyError = (error: string | ValidationError[]) => {
    notifications.show({
        title: 'Something wrong!',
        message:
            typeof error === 'string'
                ? error
                : 'The form you submitted is invalid',
        color: 'red',
    });
};

export const api = async <R>({ method, url, body }: ApiProps): Promise<R> => {
    const token = localStorage.getItem('jwt');
    const authHeaders: HeadersInit = token
        ? { Authorization: token.slice(1, -1) }
        : {};
    return fetch(`${Domain}${ApiVersion}${url}`, {
        method,
        headers: { ...headers, ...authHeaders } as HeadersInit,
        body,
    })
        .then((r) => {
            if (!r.ok)
                return r.json().then((d) => {
                    throw d as ApiError;
                });
            return r;
        })
        .then((r) => r.json() as R)
        .catch((err) => {
            if (typeof err === 'object' && 'detail' in err) {
                notifyError((err as ApiError).detail);
            } else {
                notifyError("Can't connect to the server");
            }
            throw err;
        });
};
