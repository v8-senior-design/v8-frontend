import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl">Login</h1>
        <Link href="/private/home">
          <Button>Log In</Button>
        </Link>
        <Link href="/public/register">
          <Button>Register</Button>
        </Link>
        <Link href="/public/forgot">
          <Button>Forgot Password</Button>
        </Link>
      </div>
    </div>
  );
}
