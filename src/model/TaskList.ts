export interface Task {
    id: number;
    list_id: number;
    title: string;
    description?: string;
    deadline?: Date;
    is_completed: boolean;
}

export interface TaskList {
    id: number;
    title: string;
    tasks: Task[];
}
