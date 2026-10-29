import { CourseData, AppState, ActivityData, BlockData } from '../types';

export function T(x: any, langIdx = 0): string {
  if (x == null) return '';
  if (typeof x === 'string') return x;
  if (Array.isArray(x)) {
    return x[langIdx] || x[0] || '';
  }
  return String(x);
}

export function seeded(id: string, n: number): number[] {
  let s = 0;
  for (let i = 0; i < id.length; i++) s = (s * 31 + id.charCodeAt(i)) >>> 0;
  const a: number[] = [];
  for (let i = 0; i < n; i++) a.push(i);
  for (let i = n - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) >>> 0;
    const j = s % (i + 1);
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  const same = a.every((v, k) => v === k);
  if (same && n > 1) {
    a.push(a.shift()!);
  }
  return a;
}

export function pct(sc: number, mx: number): number {
  return mx ? Math.round((sc * 1000) / mx) / 10 : 0;
}

export function fmtPct(p: number): string {
  return `${String(p).replace('.', ',')} %`;
}

export const AUTO_TYPES = new Set(['mcq', 'tf', 'classify', 'match', 'order', 'fill']);

export function activityFamily(a: ActivityData): 'auto' | 'class' | 'teacher' {
  if (AUTO_TYPES.has(a.type)) return 'auto';
  if (a.type === 'class') return 'class';
  return 'teacher';
}

export function isActivityDone(a: ActivityData, appState: AppState): boolean {
  const s = appState.a[a.id] || {};
  const fam = activityFamily(a);
  if (fam === 'auto') return (s.attempts || 0) > 0;
  if (fam === 'class') return !!s.done;
  return s.status === 'lliu' || !!s.tReviewed;
}

export function getBlockProgress(b: BlockData, appState: AppState) {
  const n = b.acts.length;
  const d = b.acts.filter((act) => isActivityDone(act, appState)).length;
  const state: 'none' | 'part' | 'full' = n && d === n ? 'full' : d ? 'part' : 'none';
  return { n, d, state, pct: n ? Math.round((d * 100) / n) : 0 };
}

export function getItemsOf(a: ActivityData) {
  if (a.type === 'tf' && a.questions) {
    const V = [['Verdadero'], ['Falso']];
    return a.questions.map((q) => ({
      label: q.q,
      opts: V,
      ans: q.ans ? 0 : 1,
      exp: q.exp,
      sel: false
    }));
  }
  if (a.type === 'classify' && a.items && a.cats) {
    return a.items.map((it) => ({
      label: it.x,
      opts: a.cats,
      ans: it.c,
      exp: it.exp,
      sel: true
    }));
  }
  if (a.type === 'match' && a.pairs) {
    const rights = a.pairs.map((p) => p.b);
    const perm = seeded(a.id, rights.length);
    const opts = perm.map((i) => rights[i]);
    return a.pairs.map((p, i) => ({
      label: p.a,
      opts,
      ans: perm.indexOf(i),
      exp: p.exp,
      sel: true
    }));
  }
  if (a.type === 'fill' && a.items) {
    return a.items.map((it) => ({
      label: it.x,
      opts: it.opts,
      ans: it.ans,
      exp: it.exp,
      sel: true
    }));
  }
  return [];
}
