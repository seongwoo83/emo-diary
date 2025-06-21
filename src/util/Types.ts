type ButtonType = "POSITIVE" | "DEFAULT" | "NEGATIVE";

interface DiaryType{
    id: number;
    createdDate: number;
    emotionId: number;
    content: string;    
}

type Action = 
    | { type: "INIT"; data: DiaryType[] }
    | { type: "CREATE"; data: DiaryType }
    | { type: "UPDATE"; data: DiaryType }
    | { type: "DELETE"; data: DiaryType };

export type {ButtonType, DiaryType, Action}