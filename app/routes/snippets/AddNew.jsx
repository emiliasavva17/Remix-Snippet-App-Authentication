import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.CodeSnippet.find();

  return snippets;
}

export async function action({ request }) {
  const body = await request.formData();
  // const name = body.get("visitorsName");
  var model = {
    title: body.get("name"),
    date: new Date(),
    description: body.get("description"),
    code_snippet: body.get("code-snippet"),
    language: body.get("language"),
    favourite: false,
  };
  const db = await connectDb();
  db.models.CodeSnippet.create(model);
  return redirect("/");
}

export default function AddNewSnippet() {
  const snippets = useLoaderData();

  return (
    <div className=" md:w-[68%] w-full flex flex-col  h-full overflow-y-auto ">
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
