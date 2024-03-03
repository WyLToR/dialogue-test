import updateQueryParams from "./handleQuery";
import { NextRouter } from "next/router";

interface SortParams {
    sortBy: string;
    sort: {
        sortBy: string;
        orderBy: string;
    };
    setSort: React.Dispatch<React.SetStateAction<{ sortBy: string; orderBy: string }>>;
    router: NextRouter;
}

export default function handleSortChange({
    sortBy,
    sort,
    setSort,
    router,
}: SortParams) {
    const orderBy =
        sort?.sortBy === sortBy && sort?.orderBy === "asc" ? "desc" : "asc";
    setSort(prevSort => ({ ...prevSort!, sortBy, orderBy }));
    updateQueryParams({ params: { sortBy, orderBy }, router });
}
