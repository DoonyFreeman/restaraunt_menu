'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ds';
import type { Location } from '@/lib/seed';

const LABELS = ['Точка', 'Дата', 'Гости', 'Контакты', 'Готово'];
const TIMES = ['12:00', '14:00', '16:00', '18:00', '19:00', '20:00', '21:00'];

function Stepper({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
      {LABELS.map((lb, i) => {
        const done = i < step, cur = i === step;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 64 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, background: cur ? 'var(--accent)' : done ? 'rgba(200,169,110,0.18)' : 'transparent', color: cur ? 'var(--text-on-gold)' : done ? 'var(--accent)' : 'var(--text-faint)', border: `1px solid ${cur || done ? 'var(--border-gold)' : 'var(--border-subtle)'}` }}>{done ? '✓' : i + 1}</div>
              <div style={{ fontSize: 11, color: cur ? 'var(--text-secondary)' : 'var(--text-faint)', textAlign: 'center' }}>{lb}</div>
            </div>
            {i < LABELS.length - 1 && <div style={{ flex: '0 0 28px', height: 1, background: i < step ? 'var(--border-gold)' : 'var(--border-subtle)', marginTop: -18 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 26, letterSpacing: '-0.02em', margin: '0 0 22px', textAlign: 'center' }}>{title}</h2>
      {children}
    </div>
  );
}

function Round({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} style={{ width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', background: 'var(--bg-well)', border: '1px solid var(--border-subtle)', color: 'var(--accent)', fontSize: 24, lineHeight: 1 }}>{children}</button>;
}

export function ReservationFlow({ locations }: { locations: Location[] }) {
  const sp = useSearchParams();
  const preselect = locations.find((l) => l.slug === sp.get('loc')) || null;
  const [step, setStep] = React.useState(preselect ? 1 : 0);
  const [f, setF] = React.useState<{ loc: Location | null; date: string; time: string; guests: number; name: string; phone: string; email: string }>({
    loc: preselect, date: '', time: '19:00', guests: 2, name: '', phone: '', email: '',
  });
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div style={{ minHeight: 'calc(100vh - var(--navbar-h))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: 'radial-gradient(100% 80% at 50% 0%, rgba(200,169,110,0.06), transparent 60%)' }}>
      <div style={{ width: 560, maxWidth: '100%', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-overlay)', padding: 40 }}>
        <Stepper step={step} />

        {step === 0 && (
          <Field title="Выберите ресторан">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {locations.map((l) => {
                const on = f.loc?.id === l.id;
                return (
                  <div key={l.id} onClick={() => set('loc', l)} style={{ padding: 16, borderRadius: 'var(--radius)', cursor: 'pointer', background: on ? 'var(--surface-card-hover)' : 'var(--bg-well)', border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-subtle)'}` }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>{l.name.replace('ChaiShopper ', '')}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{l.address}</div>
                  </div>
                );
              })}
            </div>
          </Field>
        )}

        {step === 1 && (
          <Field title="Дата и время">
            <Input label="Дата" type="date" value={f.date} onChange={(e) => set('date', e.target.value)} />
            <div style={{ marginTop: 20, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 10 }}>Время</div>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              {TIMES.map((t) => {
                const on = t === f.time;
                return <button key={t} onClick={() => set('time', t)} style={{ padding: '9px 15px', borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--text-on-gold)' : 'var(--text-secondary)', border: `1px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}` }}>{t}</button>;
              })}
            </div>
          </Field>
        )}

        {step === 2 && (
          <Field title="Сколько гостей?">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '12px 0' }}>
              <Round onClick={() => set('guests', Math.max(1, f.guests - 1))}>−</Round>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 64, fontWeight: 300, minWidth: 90, textAlign: 'center' }}>{f.guests}</div>
              <Round onClick={() => set('guests', Math.min(20, f.guests + 1))}>+</Round>
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)' }}>от 1 до 20 гостей</div>
          </Field>
        )}

        {step === 3 && (
          <Field title="Ваши контакты">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Имя" placeholder="Как вас зовут" value={f.name} onChange={(e) => set('name', e.target.value)} />
              <Input label="Телефон" placeholder="+7 ___ ___-__-__" value={f.phone} onChange={(e) => set('phone', e.target.value)} />
              <Input label="Email" type="email" placeholder="you@example.com" value={f.email} onChange={(e) => set('email', e.target.value)} />
            </div>
          </Field>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(200,169,110,0.15)', border: '1px solid var(--border-gold)', color: 'var(--accent)', fontSize: 30 }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 34, letterSpacing: '-0.02em', margin: 0 }}>Стол забронирован</h2>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 380, margin: '14px auto 0' }}>
              {(f.loc ? f.loc.name.replace('ChaiShopper ', '') : 'Покровка')} · {f.date || 'сегодня'} в {f.time} · {f.guests} {f.guests === 1 ? 'гость' : 'гостей'}.
              Менеджер подтвердит бронь и пришлёт письмо на {f.email || 'вашу почту'}.
            </p>
            <div style={{ marginTop: 30 }}><Button href="/" variant="primary">На главную</Button></div>
          </div>
        )}

        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
            {step === 0
              ? <Button href="/" variant="ghost">Отмена</Button>
              : <Button variant="ghost" onClick={back}>← Назад</Button>}
            <Button variant="primary" onClick={next} disabled={step === 0 && !f.loc}>{step === 3 ? 'Подтвердить' : 'Далее'}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
