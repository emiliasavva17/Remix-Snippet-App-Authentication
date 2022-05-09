import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form,
} from "@remix-run/react";

import styles from "./styles/app.css";

export function meta() {
  return {
    charset: "utf-8",
    title: "New Snippet App",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
// export async function loader({ request }) {
//   const db = await connectDb();
//   const url = new URL(request.url);

//   // categories
//   const category = url.searchParams.get("category");
//   var searchParams = {};
//   if (category != null && category != "") {
//     searchParams.language = category;
//   }

//   //  search
//   const searchQuery = url.searchParams.get("searchQuery");
//   if (searchQuery != null && searchQuery != "") {
//     searchParams.title = { $regex: searchQuery };
//   }

//   // filter

//   const filter = url.searchParams.get("filter_selector");
//   let filterParams = {};

//   if (filter != null && filter != "") {
//     if (filter == "title_az") {
//       //  sort title a-z
//       filterParams = { title: 1 };
//     }
//     if (filter == "title_za") {
//       //  sort title a-z
//       filterParams = { title: -1 };
//     }

//     if (filter == "last_updated") {
//       //  sort by updated
//       // searchParams.sort({date: 1});
//       filterParams = { date: -1 };
//     }
//     if (filter == "fav") {
//       //  view favourite
//       searchParams.favourite = true;
//     }
//   }

//   const snippets = await db.models.CodeSnippet.find(searchParams).sort(
//     filterParams
//   );
//   return snippets;
// }

export default function App() {
  //var snippets = useLoaderData();
  // const [toggle, setToggle] = useState(false);
  // const handleClick = (e) => setToggle(!toggle);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" text-snippet-white-0 font-light font-roboto bg-snippet-dark-0 ">
        <header className=" w-screen h-screen relative">
          <main className="  w-full py-4  flex justify-between items-center shadow-xl z-20 absolute top-0 left-0 ">
            <Link to="/">
              <h1 className=" md:text-xl text-lg font-medium md:ml-5 ml-20  ">
                Code Snippet App
              </h1>
            </Link>

            <Link to="./snippets/AddNew">
              <button className=" md:px-5 md:py-3 py-1 px-3 md:text-base text-sm shadow-lg bg-snippet-emerald mr-5 rounded-md hover:scale-105 transition-all duration-300">
                Create New
              </button>
            </Link>

            <Form method="post" action="./auth/logout">
              {/* <Link to="./auth/logout"> */}
              <button
                type="submit"
                className=" md:px-5 md:py-3 py-1 px-3 md:text-base text-sm shadow-lg bg-red-600 mr-5 rounded-md hover:scale-105 transition-all duration-300"
              >
                Log out
              </button>
              {/* </Link> */}
            </Form>
          </main>
          <Outlet />
        </header>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
