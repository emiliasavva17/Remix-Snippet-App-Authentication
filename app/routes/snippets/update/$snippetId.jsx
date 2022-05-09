import { redirect } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";

export async function loader({ params }) {
  const db = await connectDb();
  const snippet = await db.models.CodeSnippet.findById(params.snippetId);

  return snippet;
}

export async function action({ request }) {
  const body = await request.formData();
  var id = body.get("_id");
  var model = {
    title: body.get("name"),
    date: new Date(),
    description: body.get("description"),
    code_snippet: body.get("code-snippet"),
    language: body.get("language"),
  };
  const db = await connectDb();
  db.models.CodeSnippet.findByIdAndUpdate(id, model).exec();
  return redirect("/snippets/" + id);
}

export default function UpdateSnippet() {
  const snippet = useLoaderData();

  return (
    <div className=" md:w-[68%] w-full flex flex-col h-full overflow-y-auto ">
      <div className=" flex flex-col md:m-12 m-4 ">
        <h1 className=" mb-12 text-2xl font-medium ">Edit</h1>

        <Form method="post">
          <input type="hidden" value={snippet._id} name="_id" />
          <label>
            <input
              name="name"
              type="text"
              placeholder="Title"
              defaultValue={snippet.title}
              className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
            />
          </label>{" "}
          <br></br>
          <label>
            <textarea
              name="description"
              placeholder="Description"
              defaultValue={snippet.description}
              className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
            ></textarea>
          </label>{" "}
          <br></br>
          <label>
            <textarea
              name="code-snippet"
              placeholder="Code Snippet"
              defaultValue={snippet.code_snippet}
              className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
            ></textarea>
          </label>{" "}
          <br></br>
          <select
            id="language"
            name="language"
            defaultValue={snippet.language}
            className=" md:p-4 p-2 rounded-lg flex md:w-[30%] w-[60%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
          </select>{" "}
          <br></br>
          <button
            type="submit"
            className=" px-5 py-3 bg-white  mr-5 rounded-md text-snippet-dark-0 hover:scale-105 hover:cursor-pointer duration-300 transition-all "
          >
            Save
          </button>{" "}
          <br></br>
        </Form>
      </div>
    </div>
  );
}
