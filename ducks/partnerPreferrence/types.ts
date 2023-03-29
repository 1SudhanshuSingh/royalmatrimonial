export type PartnerPreferrenceResponse = {
  HIV: number;
  city: number[];
  diet: string;
  state: number[];
  country: number[];
  manglik: string[];
  smoking: string;
  drinking: string;
  religion: string[];
  education: string[];
  Challenged: string[];
  occupation: string[];
  age_less_than: string;
  mother_tongue: string[];
  marital_status: string[];
  children_status: string[];
  horoscope_match: string;
  age_greater_than: string;
  caste: number[];
  photo: string;
  height_less_than: string;
  mandatory_fields: string[];
  Residential_status: string[];
  height_greater_than: string;
  ready_to_settleAbroad: string;
  annual_income_greater_than: string;
};

export type PartnerPreferrence = {
  actionType?: "v" | "c" | "u";
  userId?: number;
  ageGreaterThan?: string;
  ageLessThan?: string;
  heightGreaterThan?: string;
  heightLessThan?: string;
  country?: string;
  state?: string;
  city?: string;
  education?: string;
  occupation?: string;
  annualIncomeGreaterThan?: string;
  maritalStatus?: string;
  religion?: string;
  motherTongue?: string;
  cast?: string;
  residentialStatus?: string;
  manglik?: string;
  diet?: string;
  smoking?: string;
  drinking?: string;
  readyToSettleAbroad?: string;
  challenged?: string;
  childrenStatus?: string;
  hiv?: string;
  horoscopeMatch?: string;
  mandatoryFields?: string;
};
