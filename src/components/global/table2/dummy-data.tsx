export type Stage =
  | "لم يبدأ"
  | "قيد التنفيذ"
  | "تم الإنجاز"
  | "تحتاج إلى موافقة";

export interface TaskRow {
  id: string;
  name: string;
  stage: Stage;
  owner: {
    name: string;
    username: string;
  };
  assignedTo: string[];
  followers: string[];
  collaborators: string[];
  endDate?: string;
}

export const dummyData: TaskRow[] = [
  {
    id: "1",
    name: "sdff",
    stage: "لم يبدأ",
    owner: { name: "Wasal", username: "w" },
    assignedTo: [],
    followers: [],
    collaborators: [],
  },
  {
    id: "2",
    name: "sdf",
    stage: "لم يبدأ",
    owner: { name: "Wasal", username: "w" },
    assignedTo: [],
    followers: [],
    collaborators: [],
  },
  {
    id: "3",
    name: "hfhh",
    stage: "لم يبدأ",
    owner: { name: "", username: "?" },
    assignedTo: [],
    followers: [],
    collaborators: ["ogaten27"],
    endDate: "2025-05-22T00:00:00",
  },
  {
    id: "4",
    name: "ختال",
    stage: "لم يبدأ",
    owner: { name: "", username: "?" },
    assignedTo: [],
    followers: [],
    collaborators: [],
  },
  {
    id: "5",
    name: "test",
    stage: "قيد التنفيذ",
    owner: { name: "Wasal", username: "w" },
    assignedTo: ["3bdullah.bu7la8", "ogaten27"],
    followers: ["Tech Support wasal"],
    collaborators: ["ogaten27"],
  },
  {
    id: "6",
    name: "testone w",
    stage: "لم يبدأ",
    owner: { name: "Wasal", username: "w" },
    assignedTo: [],
    followers: [],
    collaborators: [],
  },
  {
    id: "7",
    name: "yhj",
    stage: "تم الإنجاز",
    owner: { name: "Wasal", username: "w" },
    assignedTo: [],
    followers: [],
    collaborators: [],
    endDate: "2025-05-23T00:00:00",
  },
  {
    id: "8",
    name: "anything",
    stage: "قيد التنفيذ",
    owner: { name: "", username: "?" },
    assignedTo: [],
    followers: [],
    collaborators: ["josolek966"],
  },
];
