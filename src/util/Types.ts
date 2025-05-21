type ButtonType = "POSITIVE" | "DEFAULT" | "NEGATIVE";

interface DiaryType{
    id: number;
    createdDate: number;
    emotionId: number;
    content: string;
}

type ActionType = "CREATE" | "UPDATE" | "DELETE";
interface Action{
    type: ActionType;
    data: DiaryType;
}

export type {ButtonType, DiaryType, Action}