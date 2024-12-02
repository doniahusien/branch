export interface Comment {
    _id: string;     
    content: string;       
    createdAt: Date;       
    postId: number;        
    userId: number;       
    isEdited: boolean;    
    }