import { getSession, destroySession } from "~/sessions.server";
import { redirect } from "remix";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("./auth/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export function loader() {
  return redirect("./auth/login");
}
