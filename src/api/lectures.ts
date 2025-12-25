import axios, { AxiosResponse } from "axios";
import { Lecture } from "../types.ts";

const createCachedFetcher = <T>(url: string) => {
  let cache: Promise<AxiosResponse<T>> | null = null;
  return () => {
    if (!cache) {
      cache = axios.get<T>(url);
    }
    return cache;
  };
};

export const fetchMajors = createCachedFetcher<Lecture[]>("/schedules-majors.json");
export const fetchLiberalArts = createCachedFetcher<Lecture[]>("/schedules-liberal-arts.json");

export const fetchAllLectures = () =>
  Promise.all([
    (console.log("API Call 1", performance.now()), fetchMajors()),
    (console.log("API Call 2", performance.now()), fetchLiberalArts()),
    (console.log("API Call 3", performance.now()), fetchMajors()),
    (console.log("API Call 4", performance.now()), fetchLiberalArts()),
    (console.log("API Call 5", performance.now()), fetchMajors()),
    (console.log("API Call 6", performance.now()), fetchLiberalArts()),
  ]);
