import { LOGIN_ROUTE } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthGuard() {
  const pathname = usePathname();

  return (
    <div>
    </div>
  );
}