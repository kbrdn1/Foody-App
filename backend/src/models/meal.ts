import Food from './food';

export default interface Meal {
    id?: number;
    userId: number;
    name: string;
    foods: number[];
    date: Date;
    categoryId: 1 | 2 | 3 | 4;
}