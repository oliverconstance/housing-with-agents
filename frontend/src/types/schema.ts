/**
 * Strict Data Contracts derived from the Logical Data Model.
 * These interfaces enforce the shape of data returned by the Python backend via Firestore.
 */

export type SpeakerType = 'politician' | 'journalist' | 'organization' | 'social_media_account' | 'website' | 'other';
export type Verdict = 'True' | 'Mostly True' | 'Misleading' | 'False' | 'Unverifiable';

export interface FactCheckRecord {
  id: string;
  claim: {
    statement: string;
    speaker: {
      type: SpeakerType;
      name: string;
      affiliation?: string;
    };
    context: string;
    dateMade: string; // ISO-8601
    sourceUrl: string; // URI
  };
  analysis: {
    verdict: Verdict;
    justification: string;
    metadata: {
      modelUsed: string;
      promptVersion: string;
      timestamp: string; // ISO-8601
      tokensUsed: number;
    };
    references: Array<{
      sourceId: string;
      dataPointUrl: string;
      description: string;
    }>;
  };
}

export type GeographyLevel = 'national' | 'regional' | 'local_authority';
export type PropertyType = 'detached' | 'semi-detached' | 'terraced' | 'flat' | 'all';
export type Tenure = 'owner_occupied' | 'private_rented' | 'social_rented' | 'all';
export type EpcBand = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'A/B' | 'F/G' | 'all';
export type DeveloperType = 'private' | 'housing_association' | 'local_authority' | 'all';
export type PeriodType = 'annual' | 'quarterly' | 'monthly';

export interface HousingStatistic {
  id: string;
  datasetId: string;
  period: {
    type: PeriodType;
    startDate: string; // ISO-8601
    endDate: string; // ISO-8601
    label: string;
  };
  dimensions: {
    geography: {
      level: GeographyLevel;
      name: string;
      onsCode?: string;
    };
    propertyType: PropertyType;
    tenure: Tenure;
    epcBand: EpcBand;
    developerType: DeveloperType;
  };
  metrics: {
    totalStock?: number;
    completions?: number;
    cumulativeCompletions?: number;
  };
}
