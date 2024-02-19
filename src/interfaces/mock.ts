import Category from "./category";
import Page from "./page";
import Permission from "./permission";
import Picture from "./picture";
import User from "./user";

interface Data {
    users: User[];
    pages: Page[];
    permissions: Permission[];
    categories: Category[];
    gallery: Picture[];
}
export default Data;