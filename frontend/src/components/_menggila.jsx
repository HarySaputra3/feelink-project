import { useState as a, useRef as b } from 'react';

const c = [
  '--color-primary',
  '--color-secondary',
  '--color-accent',
  '--color-primary-darker',
  '--color-secondary-darker',
  '--color-accent-darker',
  '--color-primary-lighter',
  '--color-secondary-lighter',
  '--color-accent-lighter',
];

const d = () => {
  const e = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${'0'.repeat(6 - e.length)}${e}`;
};

export default function f() {
  const [g, h] = a(false);
  const i = b(null);

  const j = () => {
    if (i.current) return;
    h(true);
    i.current = setInterval(() => {
      c.forEach((k) => {
        document.documentElement.style.setProperty(k, d());
      });
    }, 111);
  };

  return (
    <button
      onClick={j}
      className="px-4 py-2"
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-secondary-darker)',
      }}
    >
      {g ? 'gila!' : 'gila?'}
    </button>
  );
}
