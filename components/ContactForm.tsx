'use client';
import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL, plans } from '@/lib/content';

const field = 'w-full rounded-xl border-2 border-line bg-white px-4 py-3.5 text-[18px] text-ink placeholder:text-muted focus:border-ink focus:outline-none';
const label = 'mb-2 block text-[17px] font-semibold';

/** Formulario de consulta. Lo procesa Netlify Forms; sin scripts de terceros. */
export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  // Si llegas desde un plan (/contacto/?plan=crecimiento), queda marcado
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('plan');
    const v = plans.find((p) => p.id === id)?.value;
    if (v) form.current?.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((r) => { r.checked = r.value === v; });
  }, []);

  // Los botones de los planes preseleccionan el plan
  useEffect(() => {
    const pick = (e: Event) => {
      const v = (e.currentTarget as HTMLElement).dataset.plan;
      form.current?.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((r) => { r.checked = r.value === v; });
    };
    const els = document.querySelectorAll<HTMLElement>('[data-plan]');
    els.forEach((el) => el.addEventListener('click', pick));
    return () => els.forEach((el) => el.removeEventListener('click', pick));
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) || '').trim();
    const missing: string[] = [];
    if (v('nombre').length < 2) missing.push('tu nombre');
    if (v('local').length < 2) missing.push('el nombre del negocio');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) missing.push('un correo válido');
    if (v('telefono').replace(/\D/g, '').length < 9) missing.push('un teléfono de 9 dígitos');
    if (!fd.get('rgpd')) missing.push('aceptar la política de privacidad');
    if (missing.length) { setError(`Falta ${missing.join(', ')}.`); setState('error'); return; }
    if (v('_honey')) return;
    setState('sending');
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(String(res.status));
      e.currentTarget?.reset(); form.current?.reset(); setState('ok');
    } catch {
      const body = ['Plan: ' + v('plan'), 'Nombre: ' + v('nombre'), 'Negocio: ' + v('local'), 'Email: ' + v('email'), 'Teléfono: ' + v('telefono'), 'Población: ' + v('poblacion'), '', v('mensaje')].join('\n');
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Nueva consulta: ${v('local')} (${v('plan')})`)}&body=${encodeURIComponent(body)}`;
      setError('El envío automático no ha respondido, así que hemos abierto tu programa de correo con la consulta ya escrita: solo tienes que darle a enviar.');
      setState('error');
    }
  };

  return (
    <form ref={form} name="consulta" method="POST" data-netlify="true" netlify-honeypot="_honey" onSubmit={submit} noValidate className="grid gap-7">
      <input type="hidden" name="form-name" value="consulta" />
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={label}>Plan que te interesa *</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {plans.map((p) => (
            <label key={p.id} className="cursor-pointer rounded-xl border-2 border-line bg-white px-2 py-3 text-center text-[17px] font-semibold transition-colors hover:border-ink has-[:checked]:border-naranja has-[:checked]:bg-naranja/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-naranja">
              <input type="radio" name="plan" value={p.value} defaultChecked={p.rec} className="sr-only" required />
              {p.name}<small className="mt-1 block text-[14px] font-normal text-gris">{p.price} €/mes</small>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-7 sm:grid-cols-2">
        <div><label htmlFor="nombre" className={label}>Tu nombre *</label><input id="nombre" name="nombre" required minLength={2} autoComplete="name" placeholder="Nombre y apellidos" className={field} /></div>
        <div><label htmlFor="local" className={label}>Nombre del negocio *</label><input id="local" name="local" required minLength={2} autoComplete="organization" placeholder="Tu negocio o empresa" className={field} /></div>
        <div><label htmlFor="email" className={label}>Correo electrónico *</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="tucorreo@ejemplo.com" className={field} /></div>
        <div><label htmlFor="telefono" className={label}>Teléfono *</label><input id="telefono" name="telefono" type="tel" required autoComplete="tel" placeholder="600 00 00 00" className={field} /></div>
      </div>
      <div><label htmlFor="poblacion" className={label}>Población</label><input id="poblacion" name="poblacion" autoComplete="address-level2" placeholder="Tu ciudad o pueblo" className={field} /></div>
      <div><label htmlFor="mensaje" className={label}>¿Qué te gustaría cambiar?</label><textarea id="mensaje" name="mensaje" rows={3} placeholder="Me cuesta que me encuentren en Google y quiero más clientes entre semana…" className={`${field} resize-y`} /></div>
      <p className="hidden" aria-hidden><label>No rellenar <input name="_honey" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="flex items-start gap-3">
        <input id="rgpd" name="rgpd" type="checkbox" value="acepta" required className="mt-1 h-5 w-5 accent-naranja" />
        <label htmlFor="rgpd" className="text-[16px] text-gris">He leído y acepto la <a href="/legal/#privacidad" className="underline underline-offset-4">política de privacidad</a> y que Rumbo use estos datos para responder a mi consulta.</label>
      </div>
      <button type="submit" disabled={state === 'sending'} data-cursor="ENVIAR"
        className="btn btn-naranja min-h-[60px] text-[1.15rem] disabled:opacity-60">
        {state === 'sending' ? 'Enviando…' : 'Reservar mi consulta'}
      </button>
      <div role="status" aria-live="polite">
        {state === 'ok' && <p className="rounded-xl border-2 border-[#128C4A] bg-[#25D366]/10 p-4 text-[17px]">Recibido. Te escribimos en menos de 24 horas laborables.</p>}
        {state === 'error' && <p className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-[17px] text-red-800">{error}</p>}
      </div>
    </form>
  );
}
