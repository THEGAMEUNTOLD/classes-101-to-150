import { tavily } from "@tavily/core";
import dotenv from "dotenv";

dotenv.config();

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const searchWeb = async (query) => {
  try {
    //  Pass query as string, options as 2nd argument
    const response = await tvly.search(query, {
      search_depth: "basic",
      max_results: 3
    });

    return response.results;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};