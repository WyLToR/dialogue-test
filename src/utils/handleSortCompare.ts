const compareElements = (a: any, b: any, { sort }: any): number => {
    const orderByString = sort.orderBy || "asc";
    if (sort.sortBy === "createdAt") {
        const dateA = new Date(a.createdAt) as Date;
        const dateB = new Date(b.createdAt) as Date;
        return sort.orderBy === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sort.sortBy !== null) {
        return sort.orderBy === "asc" ? (a[sort.sortBy] < b[sort.sortBy] ? -1 : 1) : (a[sort.sortBy] > b[sort.sortBy] ? -1 : 1);
    } else {
        return 0;
    }
};


export default compareElements;