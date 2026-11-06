import { useState, type ReactNode } from 'react';
import { Menu, Radio } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

interface AppLayoutProps {
  radioName: string | null;
  children: ReactNode;
}

export default function AppLayout({ radioName, children }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas font-sans text-sidebar">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} radioName={radioName} />

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-sidebar-dark/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-canvas/90 px-4 backdrop-blur lg:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sidebar transition-colors hover:bg-white/60"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="flex items-center gap-2 text-sm font-semibold text-sidebar">
              <Radio className="h-4 w-4 text-accent-700" aria-hidden="true" />
              {radioName ?? 'Amateur Radio'}
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
