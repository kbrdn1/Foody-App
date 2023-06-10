export default interface Food {
    id?: number;
    name: string;
    img?: string | null;
    calorie: number;
    lipid: number;
    carbohydrate: number;
    protein: number;
}