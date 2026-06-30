'use client';

import React from 'react';
import { Button, Input, Tag, Card, MenuItemCard, CeremonyCard } from '@/components/ds';

const wrap: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', padding: '48px 32px' };
const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 28, letterSpacing: '-0.02em',
  color: 'var(--text-primary)', margin: '64px 0 24px',
};
const row: React.CSSProperties = { display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' };

export default function StyleguidePage() {
  return (
    <main style={wrap}>
      <div className="cs-eyebrow">Design system</div>
      <h1 className="cs-display" style={{ margin: '12px 0 0' }}>ChaiShopper</h1>
      <p className="cs-quote" style={{ marginTop: 16, maxWidth: 520 }}>
        «Тишина между глотками — тоже часть чая.»
      </p>

      <h2 style={sectionTitle}>Buttons</h2>
      <div style={{ ...row, marginBottom: 16 }}>
        <Button variant="primary">Забронировать стол</Button>
        <Button variant="secondary">Смотреть меню</Button>
        <Button variant="ghost">Всё меню →</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
      <div style={row}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>

      <h2 style={sectionTitle}>Tags</h2>
      <div style={row}>
        <Tag tone="veg" dot>Вегет.</Tag>
        <Tag tone="spicy" dot>Острое</Tag>
        <Tag tone="top">Хит</Tag>
        <Tag tone="gold">Gold</Tag>
        <Tag tone="neutral">Neutral</Tag>
      </div>

      <h2 style={sectionTitle}>Input</h2>
      <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Input label="Имя" placeholder="Как вас зовут" />
        <Input label="Email" type="email" placeholder="you@example.com" hint="Пришлём подтверждение брони" />
        <Input label="Телефон" placeholder="+7 ___ ___-__-__" error="Введите корректный номер" />
      </div>

      <h2 style={sectionTitle}>Cards</h2>
      <Card style={{ maxWidth: 360, marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-primary)' }}>Базовая карточка</div>
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)' }}>Наведи курсор — карточка приподнимается, тень углубляется.</p>
      </Card>

      <h2 style={sectionTitle}>MenuItemCard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <MenuItemCard name="Улун с горным мёдом" price={480} tags={['veg', 'top']}
          description="Полуферментированный чай с тёплыми нотами и долгим послевкусием."
          image="linear-gradient(150deg,#6b5b4e,#2a2520)" />
        <MenuItemCard name="Хар Гао с креветкой" price={590} tags={['top']}
          description="Полупрозрачное тесто, сочная начинка, подача на пару."
          image="url(/design/photo-gyoza-dark.jpg)" />
        <MenuItemCard name="Лапша Дан-Дан" price={640} tags={['spicy']}
          description="Пшеничная лапша, кунжутный соус и сычуаньский перец."
          image="linear-gradient(150deg,#7a4f3e,#2a1a14)" />
      </div>

      <h2 style={sectionTitle}>CeremonyCard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <CeremonyCard name="Гунфу Ча" durationMin={60} price={2400}
          description="Классическая церемония пролива — внимание к каждому настою улуна."
          image="linear-gradient(180deg, rgba(20,15,12,0.30), rgba(20,15,12,0.62)), url(/design/photo-teapot-dark.jpg)"
          onBook={() => alert('book')} />
        <CeremonyCard name="Тядо · Матча" durationMin={45} price={1900}
          description="Взбивание маття венчиком тясэн в тишине и неспешности."
          image="linear-gradient(160deg,#3a4636,#15130f)" onBook={() => alert('book')} />
        <CeremonyCard name="Вечерний Пуэр" durationMin={75} price={2800}
          description="Глубокий выдержанный чай для медленного завершения дня."
          image="linear-gradient(160deg,#43332a,#120f0c)" onBook={() => alert('book')} />
      </div>

      <div style={{ height: 96 }} />
    </main>
  );
}
