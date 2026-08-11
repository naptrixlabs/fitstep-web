import { API_BASE } from './config';

export interface ContentDoc {
  slug: string;
  title: string;
  body: string;
  version: number;
  updated_at: string;
}

export interface DataSourceLink { label: string; url: string }
export interface DataSourceSection {
  icon: string;
  title: string;
  body: string;
  links?: DataSourceLink[];
}
export interface DataSourcesPayload {
  version: number;
  sections: DataSourceSection[];
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const body = await res.json();
  return (body.data ?? body) as T;
}

export const api = {
  contentDoc: (slug: string) => get<ContentDoc>(`/content/${slug}`),
  dataSources: () => get<DataSourcesPayload>('/content/data-sources'),
};
