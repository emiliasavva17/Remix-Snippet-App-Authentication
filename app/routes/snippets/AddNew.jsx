import { redirect, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession } from "~/sessions.server";

export async function loader({ request }) {
  const session = await requireUserSession(request);

  return json({ userId: session.get("userId") });
  //return snippets;
}

export async function action({ request }) {
  const session = await requireUserSession(request);
  const body = await request.formData();
  const db = await connectDb();

  var model = {
    title: body.get("name"),
    date: new Date(),
    description: body.get("description"),
    code_snippet: body.get("code-snippet"),
    language: body.get("language"),
    favourite: false,
    userId: session.get("userId"),
  };
  try {
    const newSnippet = await db.models.CodeSnippet.create(model);
    return redirect(`/snippets/${newSnippet._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(body) },
      { status: 400 }
    );
  }
}

export default function AddNewSnippet() {
  const { userId } = useLoaderData();

  if (userId) {
    return (
      <div className=" md:w-[68%] w-full flex flex-col  h-full overflow-y-auto ">
        <Link to="/" className="inline-block mt-3 p-5 font-bold underline ">
          Back
        </Link>
        <div className=" flex flex-col md:m-12 m-4 ">
          <h1 className=" mb-12 text-2xl font-medium ">Create new</h1>

          <form method="post">
            <label>
              <input
                name="name"
                type="text"
                placeholder="Title"
                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
              />
            </label>{" "}
            <br></br>
            <label>
              <textarea
                name="description"
                placeholder="Description"
                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
              ></textarea>
            </label>{" "}
            <br></br>
            <label>
              <textarea
                name="code-snippet"
                placeholder="Code Snippet"
                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
              ></textarea>
            </label>{" "}
            <br></br>
            <select
              id="language"
              name="language"
              className=" md:p-4 p-2 rounded-lg flex md:w-[30%] w-[60%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
            </select>{" "}
            <br></br>
            <button
              type="submit"
              className=" px-5 py-3  bg-white  mr-5 rounded-md text-snippet-dark-0 hover:scale-105 hover:cursor-pointer duration-300 transition-all "
            >
              Create
            </button>{" "}
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}
