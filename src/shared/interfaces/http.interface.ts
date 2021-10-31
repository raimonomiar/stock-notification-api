import { ParsedQs } from "qs";


export interface IPagination {
    size: number | string | ParsedQs | string [] | ParsedQs [];
    page: number | string | ParsedQs | string [] | ParsedQs[];
}

export interface ISort {
    order:  number | string | ParsedQs | string [] | ParsedQs [];
    orderBy:  number | string | ParsedQs | string [] | ParsedQs [];
}


export enum ESortOrder {
    ASC = "asc",
    DESC = "desc",
    EMPTY = ""
}