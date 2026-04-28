export const secondaryPageStyles = {
  wrapper: 'flex min-h-screen flex-col bg-[var(--bg-primary)]',
  header:
    'py-24 text-center md:py-32',
  title:
    'mb-6 text-4xl font-black tracking-[-0.02em] text-[var(--text-primary)] md:text-[3.5rem]',
  subtitle: 'mx-auto max-w-[650px] text-xl text-[var(--text-secondary)]',
  contentSection: 'px-6 py-20 md:py-24 lg:py-28',
  card:
    'mx-auto max-w-[850px] rounded-[var(--radius-xl)] p-8 text-[1.0625rem] leading-8 md:p-16 [&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:text-[1.75rem] [&_h2]:font-extrabold [&_h2]:text-[var(--text-primary)] [&_h2:first-of-type]:mt-0 [&_li]:mb-3 [&_li]:text-[var(--text-secondary)] [&_p]:mb-6 [&_p]:text-[var(--text-secondary)] [&_strong]:text-[var(--text-primary)] [&_ul]:mb-8 [&_ul]:pl-6',
  lastUpdated:
    'mt-16 border-t border-[var(--border)] pt-8 text-sm italic text-[var(--text-tertiary)]',
} as const;
