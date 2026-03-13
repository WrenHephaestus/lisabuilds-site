export interface ProjectSignals {
    languages: string[];
    frameworks: string[];
    buildTools: string[];
    testFrameworks: string[];
    packageManager: string | null;
    hasDocker: boolean;
    hasCI: boolean;
    ciPlatform: string | null;
    hasMono: boolean;
    projectName: string | null;
    projectDescription: string | null;
    entryPoints: string[];
    keyDirectories: string[];
    existingClaudeMd: string | null;
    detectedType: ProjectType;
}
export type ProjectType = "web-app" | "api" | "cli" | "library" | "mobile" | "data-pipeline" | "monorepo" | "static-site" | "unknown";
export declare function detectProject(dir: string): ProjectSignals;
