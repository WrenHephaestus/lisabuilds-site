import type { ProjectSignals, ProjectType } from "./detector.js";
export interface UserAnswers {
    projectName: string;
    projectDescription: string;
    projectType: ProjectType;
    languages: string[];
    frameworks: string[];
    testCommand: string;
    buildCommand: string;
    devCommand: string;
    codeStyle: string[];
    doNotRules: string[];
    commonTasks: string[];
    keyFiles: string[];
    architecture: string;
    teamContext: string;
    additionalNotes: string;
}
export declare function runPrompts(signals: ProjectSignals): Promise<UserAnswers>;
