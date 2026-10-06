'use client';
import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL, plans } from '@/lib/content';

const field = 'w-full border-0 border-b border-cal/25 bg-transparent px-0 py-3 text-[17px] text-cal placeholder:text-muted focus:border-naranja focus:outline-none focus:ring-0';
const label = 'tech mb-1 block text-gris';

/** Formulario de consulta. Lo procesa Netlify Forms; sin scripts de terceros. */
export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

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
    if (v('local').length < 2) missing.push('el nombre del local');
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
      const body = ['Plan: ' + v('plan'), 'Nombre: ' + v('nombre'), 'Local: ' + v('local'), 'Email: ' + v('email'), 'Teléfono: ' + v('telefono'), 'Población: ' + v('poblacion'), '', v('mensaje')].join('\n');
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
            <label key={p.id} className="cursor-pointer border border-cal/20 px-2 py-3 text-center text-[15px] transition-colors hover:border-brasa has-[:checked]:border-naranja has-[:checked]:bg-naranja/15 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brasa">
              <input type="radio" name="plan" value={p.value} defaultChecked={p.rec} className="sr-only" required />
              {p.name}<small className="tech mt-1 block text-[10px] text-muted">{p.price} €/mes</small>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-7 sm:grid-cols-2">
        <div><label htmlFor="nombre" className={label}>Tu nombre *</label><input id="nombre" name="nombre" required minLength={2} autoComplete="name" placeholder="Nombre y apellidos" className={field} /></div>
        <div><label htmlFor="local" className={label}>Nombre del local *</label><input id="local" name="local" required minLength={2} autoComplete="organization" placeholder="Tu restaurante o negocio" className={field} /></div>
        <div><label htmlFor="email" className={label}>Correo electrónico *</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="tucorreo@ejemplo.com" className={field} /></div>
        <div><label htmlFor="telefono" className={label}>Teléfono *</label><input id="telefono" name="telefono" type="tel" required autoComplete="tel" placeholder="600 00 00 00" className={field} /></div>
      </div>
      <div><label htmlFor="poblacion" className={label}>Población</label><input id="poblacion" name="poblacion" autoComplete="address-level2" placeholder="Roquetas de Mar, Almería…" className={field} /></div>
      <div><label htmlFor="mensaje" className={label}>¿Qué te gustaría cambiar?</label><textarea id="mensaje" name="mensaje" rows={3} placeholder="Entre semana el local se queda a medias, los sábados va lleno…" className={`${field} resize-y`} /></div>
      <p className="hidden" aria-hidden><label>No rellenar <input name="_honey" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="flex items-start gap-3">
        <input id="rgpd" name="rgpd" type="checkbox" value="acepta" required className="mt-1 h-5 w-5 accent-naranja" />
        <label htmlFor="rgpd" className="text-[15px] text-gris">He leído y acepto la <a href="#privacidad" className="underline underline-offset-4">política de privacidad</a> y que Rumbo use estos datos para responder a mi consulta.</label>
      </div>
      <button type="submit" disabled={state === 'sending'} data-cursor="ENVIAR"
        className="min-h-[56px] bg-naranja px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-brasa disabled:opacity-60">
        {state === 'sending' ? 'Enviando…' : 'Reservar mi consulta'}
      </button>
      <div role="status" aria-live="polite">
        {state === 'ok' && <p className="border border-naranja/60 bg-naranja/10 p-4 text-[15px]">Recibido. Te escribimos en menos de 24 horas laborables.</p>}
        {state === 'error' && <p className="border border-red-400/50 bg-red-500/10 p-4 text-[15px] text-[#f5d0c9]">{error}</p>}
      </div>
    </form>
  );
}
