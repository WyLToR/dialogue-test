import updateQueryParams from "./handleQuery";
import { NextRouter } from "next/router";

interface SearchParams {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    router: NextRouter;
}

export default function handleSearchChange({ search, setSearch, router }: SearchParams) {
    updateQueryParams({ params: { search }, router });
}
