import type { Metadata } from 'next';
import ServiceView from '@/components/ServiceView';
import { servicePages } from '@/lib/content';

const s = servicePages.find((p) => p.slug === 'redes')!;
export const metadata: Metadata = { title: s.title, description: s.lead, alternates: { canonical: '/redes/' } };

export default function Page() {
  return <ServiceView s={s} />;
}
