import axios, { AxiosResponse } from "axios";
import { Lecture } from "../types.ts";

let majorsCache: Promise<AxiosResponse<Lecture[]>> | null = null;
let liberalArtsCache: Promise<AxiosResponse<Lecture[]>> | null = null;

export const fetchMajors = (): Promise<AxiosResponse<Lecture[]>> => {
  if (!majorsCache) {
    majorsCache = axios.get<Lecture[]>("/schedules-majors.json");
  }
  return majorsCache;
};

export const fetchLiberalArts = (): Promise<AxiosResponse<Lecture[]>> => {
  if (!liberalArtsCache) {
    liberalArtsCache = axios.get<Lecture[]>("/schedules-liberal-arts.json");
  }
  return liberalArtsCache;
};

export const fetchAllLectures = () =>
  Promise.all([
    (console.log("API Call 1", performance.now()), fetchMajors()),
    (console.log("API Call 2", performance.now()), fetchLiberalArts()),
    (console.log("API Call 3", performance.now()), fetchMajors()),
    (console.log("API Call 4", performance.now()), fetchLiberalArts()),
    (console.log("API Call 5", performance.now()), fetchMajors()),
    (console.log("API Call 6", performance.now()), fetchLiberalArts()),
  ]);
