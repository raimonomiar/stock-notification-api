import { IPagination, ISort } from "../interfaces";

export function getSorting(query: ISort) {
    let { order, orderBy } = query;

    if (order === "" || order === undefined || orderBy === "" || orderBy === undefined) {
        return {};
    }

    const sort = {
        order: [[orderBy, order]]
    }

    return sort;

}

export function getPagination(query: IPagination) {
    let { size, page } = query;

    if (page === undefined || page === "") {
        page = 1;
    }

    if (size === undefined || size === "") {
        size = 20;
    }

    const pagination = {
        limit: Number(size),
        offset: (Number(page) - 1) * Number(size) 
    }

    return pagination;
}