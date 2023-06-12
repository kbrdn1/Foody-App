import Food from './food';

export default interface Meal {
    id?: number;
    userId: number;
    foods: number[];
    date: string;
    categoryId: 1 | 2 | 3 | 4;
}