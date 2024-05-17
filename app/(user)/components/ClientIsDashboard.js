import { usePathname } from 'next/navigation';

export default function ClientIsDashboard({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return children({ isDashboard });
}