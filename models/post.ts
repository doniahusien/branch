export interface Post {
    _id: string;           
    content: string;   
    createdAt: Date;       
    userId: number;         
    reactions: {
        like: number;    
        love: number;        
        haha: number;        
        sad: number;         
        angry: number;        
    };
}