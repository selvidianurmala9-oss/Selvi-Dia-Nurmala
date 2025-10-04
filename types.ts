
export interface Meeting {
  id: number;
  title: string;
  isExam?: boolean;
  isProject?: boolean;
  isReview?: boolean;
  theory?: string[];
  practice?: string[];
  assignment?: string[];
  assignmentAnswers?: string[];
  summary?: string;
  projectInfo?: {
    description: string;
    groups: string;
    grading: string[];
  };
}