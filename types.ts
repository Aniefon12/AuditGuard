
export interface AuditResult {
  status: 'VERIFIED MATCH' | 'CRITICAL MISMATCH';
  summary: string;
  analysis: string;
  proof: string;
  riskAssessment: string;
}

export interface AuditRequest {
  code: string;
  claim: string;
}
