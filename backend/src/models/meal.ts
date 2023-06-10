import Food from './food';

export default interface Meal {
    id?: number;
    userId: number;
    name: string;
    foods: Food[];
    date: Date;
}