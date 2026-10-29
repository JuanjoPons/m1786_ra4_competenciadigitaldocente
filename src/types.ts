export interface CourseMeta {
  title: string[];
  subtitle: string[];
  short: string;
  key: string;
  sessionLength: string[];
  curriculum: boolean;
  curriculumLabel: string;
  theme: string;
  figure: string;
}

export interface ActivityItem {
  x?: string[];
  label?: string[];
  opts?: string[][];
  ans?: number | boolean;
  exp?: string[];
  c?: number;
}

export interface ActivityData {
  id: string;
  type: 'classify' | 'match' | 'order' | 'tf' | 'fill' | 'teacher' | 'class';
  origin?: 'manual' | 'complementaria';
  time?: string[];
  timeManual?: string[];
  kind?: string[];
  group?: string[];
  mode?: string[];
  ce?: string;
  ra?: string;
  title: string[];
  instr?: string[];
  cats?: string[][];
  items?: any[];
  questions?: any[];
  pairs?: { a: string[]; b: string[]; exp?: string[] }[];
  grid?: { cols: string[][]; rows: number };
  fields?: string[][];
  rubric?: string[];
  solution?: string[][];
  exp?: string[];
  block: string;
}

export interface SectionNode {
  t: 'p' | 'h3' | 'sub' | 'box' | 'list' | 'table' | 'flow' | 'viz' | 'links';
  x?: string[];
  v?: any;
  k?: string;
  nodes?: SectionNode[];
  items?: any[];
  rows?: any[][];
  fixed?: boolean;
  smart?: string;
  sub?: boolean;
  start?: number;
  title?: string[];
}

export interface SectionData {
  num: number;
  kind: 'intro' | 'theory' | 'selfcheck' | 'example' | 'activity' | 'summary' | 'assessment';
  title?: string[];
  nodes: SectionNode[];
  acts: string[];
  videos?: any[];
  visuals?: any[];
  fold?: boolean;
  collapse?: boolean;
}

export interface BlockData {
  id: string;
  ud: string;
  title: string[];
  meta?: { ra_fp?: string; ce_txt?: string; ra_cert?: string; pes?: string };
  cover?: {
    signs: [string, string, string[]][];
    lead: string[];
  };
  art?: string;
  sections: SectionData[];
  final: string[];
  acts: ActivityData[];
  notes?: string[][];
}

export interface CourseData {
  day: number;
  file: string;
  langs: string[];
  meta: CourseMeta;
  ui: Record<string, Record<string, string>>;
  blocks: BlockData[];
  uds: { id: string; title: string[] }[];
  range: string;
}

export interface StudentInfo {
  name: string;
  group: string;
  date: string;
  notes: string;
}

export interface UserActivityState {
  resp?: any;
  checked?: boolean;
  attempts?: number;
  best?: { sc: number; mx: number };
  last?: { sc: number; mx: number; at: string; resp: any };
  text?: string[];
  grid?: string[][];
  status?: 'pend' | 'lliu';
  tGrade?: string;
  tComment?: string;
  tReviewed?: boolean;
  tBy?: string;
  done?: boolean;
  obs?: string;
}

export interface AppState {
  day: number;
  lang: string;
  cur: string;
  teacher: boolean;
  student: StudentInfo;
  a: Record<string, UserActivityState>;
  vids: Record<string, string>;
  finalObs: string;
}
