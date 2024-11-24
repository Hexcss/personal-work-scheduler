'use client';

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-surface text-gray-400 text-center">
      <p>© {new Date().getFullYear()} Work Scheduler. All rights reserved.</p>
    </footer>
  );
}
