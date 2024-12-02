export interface User {
    _id: string;            
    name: string;           
    email: string;          
    password: string;     
    gender: 'male' | 'female'; 
    dateOfBirth: Date;    
    createdAt: Date;       
    profileImage?: string; 
    }