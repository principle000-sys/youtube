export interface ScriptAnalysis {
  hookStrategy: string;
  pacingAndTone: string;
  structureBreakdown: string[];
  keyViralFactors: string;
}

export interface GeneratedScript {
  title: string;
  scriptContent: string; // Formatted in Markdown
}

export interface ViralResponse {
  analysis: ScriptAnalysis;
  newScript: GeneratedScript;
}

export enum AppState {
  IDLE,
  ANALYZING,
  SUCCESS,
  ERROR
}