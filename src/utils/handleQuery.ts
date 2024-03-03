import { NextRouter } from "next/router";

interface QueryParams {
    params: { [key: string]: any };
    router: NextRouter;
}

export default function updateQueryParams({ params, router }: QueryParams) {
    const query = { ...router.query, ...params };
    Object.keys(query).forEach((key) => {
        if (query[key] === "") {
            delete query[key];
        }
    });
    router.push({ pathname: router.pathname, query });
}
