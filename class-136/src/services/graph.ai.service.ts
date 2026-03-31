import { StateSchema, MessagesValue, GraphNode, StateGraph, START, END } from "@langchain/langgraph";


type JUDGEMENT = {
    winner: "solution_1" | "solution_2"
    solution_1_score: string;
    solution_2_score: string;
}

type AIBATTLESTATE = {
    messages: typeof MessagesValue;
    solution_1: "";
    solution_2: "";
    judgement: {
        winner: "solution_1",
        solution_1_score: 0,
        solution_2_score: 0
    };
}

const State = new StateSchema({
    messages: MessagesValue,
})
