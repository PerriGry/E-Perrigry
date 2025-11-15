import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify_access_token } from "@/services/auth.service";

export default async function UserLayout({ children }) {
  const token = await cookies().get("access_token")?.value;

  if (!token) {
    redirect("/Login_user");
  }

  let payload;
  try {
    payload = verify_access_token(token);
  } catch (err) {
    redirect("/Login_user");
  }

  return <>{children}</>;
}
