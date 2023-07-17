import { api } from './api';
import { JWT, Task, TaskList, User } from './model';
import { DateValue } from '@mantine/dates';

export type LoginParams = { email: string; password: string };
export type CreateUserParams = { email: string; password: string };
export type CreateTaskListParams = { title: string };
export type UpdateTaskListParams = { id: number; body: { title: string } };
export type CreateTaskParams = {
    list_id: number;
    title?: string;
    description?: string;
    deadline?: DateValue | string;
};
export type UpdateTaskParams = {
    id: number;
    body: {
        title: string;
        description?: string;
        deadline?: DateValue | string;
        is_completed: boolean;
    };
};
export type UpdateTasksParentParams = {
    new_parent_id: number;
    body: { tasks_id: number[] };
};
export type DeleteTasksParams = { tasks_id: number[] };
export type GetTaskListParams = { id: number };
export type DeleteTaskListParams = { id: number };
export type GetTaskParams = { id: number };

export const loginRequest = async (data: LoginParams): Promise<JWT> =>
    api<JWT>({
        method: 'POST',
        url: `/users/login`,
        body: JSON.stringify(data),
    });

export const createUserRequest = async (
    data: CreateUserParams,
): Promise<User> =>
    api<User>({
        method: 'POST',
        url: `/users`,
        body: JSON.stringify(data),
    });

export const getUserRequest = async (): Promise<User> =>
    api<User>({
        method: 'GET',
        url: `/users/me`,
        body: null,
    });

export const createTaskListRequest = async (
    data: CreateTaskListParams,
): Promise<TaskList> => {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;

    const newData = {
        ...data,
        user_email: user.email,
    };

    return api<TaskList>({
        method: 'POST',
        url: `/lists`,
        body: JSON.stringify(newData),
    }).then((response) => ({
        ...response,
        tasks: response.tasks.map((task) => ({
            ...task,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            deadline: task.deadline ? new Date(`${task.deadline}Z`) : undefined,
        })),
    }));
};

export const getTaskListsRequest = async (): Promise<TaskList[]> =>
    api<TaskList[]>({
        method: 'GET',
        url: `/lists`,
        body: null,
    }).then((response) =>
        response.map((taskList) => ({
            ...taskList,
            tasks: taskList.tasks.map((task) => ({
                ...task,

                deadline: task.deadline
                    ? new Date(`${task.deadline}Z`)
                    : undefined,
            })),
        })),
    );

export const getTaskListRequest = async (
    data: GetTaskListParams,
): Promise<TaskList> =>
    api<TaskList>({
        method: 'GET',
        url: `/lists/${data.id}`,
        body: null,
    }).then((response) => ({
        ...response,
        tasks: response.tasks.map((task) => ({
            ...task,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            deadline: task.deadline ? new Date(`${task.deadline}Z`) : undefined,
        })),
    }));

export const updateTaskListRequest = async (
    data: UpdateTaskListParams,
): Promise<TaskList> =>
    api<TaskList>({
        method: 'PUT',
        url: `/lists/${data.id}`,
        body: JSON.stringify(data.body),
    }).then((response) => ({
        ...response,
        tasks: response.tasks.map((task) => ({
            ...task,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            deadline: task.deadline ? new Date(`${task.deadline}Z`) : undefined,
        })),
    }));

export const deleteTaskListRequest = async (
    data: DeleteTaskListParams,
): Promise<void> =>
    api<void>({
        method: 'DELETE',
        url: `/lists/${data.id}`,
        body: null,
    });

export const createTaskRequest = async (
    data: CreateTaskParams,
): Promise<Task> =>
    api<Task>({
        method: 'POST',
        url: `/tasks`,
        body: JSON.stringify(data),
    }).then((response) => ({
        ...response,

        deadline: response.deadline
            ? new Date(`${response.deadline}Z`)
            : undefined,
    }));

export const getTaskRequest = async (data: GetTaskParams): Promise<Task> =>
    api<Task>({
        method: 'GET',
        url: `/tasks/${data.id}`,
        body: null,
    }).then((response) => ({
        ...response,

        deadline: response.deadline
            ? new Date(`${response.deadline}Z`)
            : undefined,
    }));

export const updateTaskRequest = async (
    data: UpdateTaskParams,
): Promise<Task> => {
    if (!data.body.deadline) {
        data.body.deadline = null;
    }

    return api<Task>({
        method: 'PUT',
        url: `/tasks/${data.id}`,
        body: JSON.stringify(data.body),
    }).then((response) => ({
        ...response,

        deadline: response.deadline
            ? new Date(`${response.deadline}Z`)
            : undefined,
    }));
};

export const updateTasksParentRequest = async (
    data: UpdateTasksParentParams,
): Promise<Task[]> =>
    api<Task[]>({
        method: 'PUT',
        url: `/tasks/parent/${data.new_parent_id}`,
        body: JSON.stringify(data.body),
    }).then((response) =>
        response.map((task) => ({
            ...task,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            deadline: task.deadline ? new Date(`${task.deadline}Z`) : undefined,
        })),
    );

export const deleteTasksRequest = async (
    data: DeleteTasksParams,
): Promise<void> =>
    api<void>({
        method: 'DELETE',
        url: `/tasks`,
        body: JSON.stringify(data),
    });
