export type UserRole = 'HR_MANAGER' | 'RECRUITER' | 'TECHNICAL_INTERVIEWER' | 'SYSTEM_ADMIN';

export type StageType = 'INITIAL' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';

export interface Stage {
  id: string;
  name: string;
  type: StageType;
  orderIndex: number;
  color?: string;
  guardRule?: string; // e.g. "MIN_LOCKED_SCORECARD_1" for OFFER
}

export interface SecurityThreat {
  id: string;
  type: 'TINY_FONT' | 'COLOR_MATCH_BACKGROUND' | 'OUT_OF_BOUNDS' | 'SYSTEM_OVERRIDE_PROMPT';
  description: string;
  quarantinedText: string;
  fontSize?: number;
  colorHex?: string;
  deltaE?: number;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface RubricEvidence {
  criterionId: string;
  criterionName: string;
  weight: number;
  score: number; // 1 to 5
  justification: string;
  evidenceQuote: string;
  isVerified: boolean;
  matchSimilarity: number; // e.g. 0.94 >= 0.8
  cvSnippetLocation?: string;
}

export interface CandidateApplication {
  id: string;
  candidateCode: string; // e.g. "CAND-042"
  masterCandidateId: string;
  fullName: string; // Recruiter view
  blindCode: string; // Interviewer view, e.g. "CANDIDATE_042"
  jobId: string;
  stageId: string;
  version: number; // Optimistic locking
  lexoRank: string; // LexoRank string (e.g. "0|hzzzzz:")
  
  // Experience metrics (Merged intervals)
  totalWorkExpMonths: number;
  educationLevel: string; // e.g. "Đại học - Kỹ sư CNTT"
  universityTier: string; // e.g. "[UNIVERSITY_TIER_1]"
  
  // Screening scores
  failedHardFilterReason?: string;
  bm25Rank?: number;
  vectorRank?: number;
  rrfScore?: number;
  rubricScore?: number; // 0 - 100
  rubricEvidences?: RubricEvidence[];
  
  // Security & Flags
  hasSecurityFlag: boolean;
  securityThreats?: SecurityThreat[];
  
  // Deduplication & Cooldown
  isPotentialDuplicate?: boolean;
  duplicateMatchScore?: number;
  cooldownFlag?: boolean;
  cooldownMessage?: string;
  
  // Scorecard status
  scorecardsCount: number;
  lockedScorecardsCount: number;
  
  updatedAt: string;
}

export interface ScoringCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // Percentage, e.g. 40
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  status: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  minWorkExpMonths: number;
  maxSalary?: number;
  totalApplications: number;
  pipelineTemplateId: string;
  rubric: ScoringCriterion[];
}

export interface ScorecardCriterionGrade {
  criterionId: string;
  criterionName: string;
  score: number; // 1-5
  comment: string;
}

export interface Scorecard {
  id: string;
  interviewId: string;
  applicationId: string;
  interviewerId: string;
  interviewerName: string;
  status: 'DRAFT' | 'SUBMITTED_AND_LOCKED';
  grades: ScorecardCriterionGrade[];
  overallRecommendation: 'STRONG_HIRE' | 'HIRE' | 'NEUTRAL' | 'NO_HIRE' | 'STRONG_NO_HIRE';
  generalNotes: string;
  lockedAt?: string;
}
