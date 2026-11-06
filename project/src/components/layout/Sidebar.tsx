import { Home, Radio, X } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  radioName: string | null;
}

export default function Sidebar({ open, onClose, radioName }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-white transition-transform duration-300 ease-out lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500">
            <Radio className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="truncate text-base font-semibold">
            {radioName ?? 'Amateur Radio'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4" aria-label="Main">
        <a
          href="#home"
          aria-current="page"
          className="relative flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
        >
          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent-300" />
          <Home className="h-5 w-5" aria-hidden="true" />
          Home
        </a>
      </nav>
    </aside>
  );
}
