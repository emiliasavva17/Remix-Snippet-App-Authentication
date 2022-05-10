import { useLoaderData, Link, Form } from "@remix-run/react";
import { useState } from "react";
import { requireUserSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";
import SnippetList from "../components/SnippetList";
import CategoryList from "../components/CategoryList";
import MobileMenu from "../components/MobileMenu";

export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url);
  const session = await requireUserSession(request);

  const userId = session.get("userId");
  // categories
  const category = url.searchParams.get("category");
  var searchParams = {};
  if (category != null && category != "") {
    searchParams.language = category;
  }

  //  search
  const searchQuery = url.searchParams.get("searchQuery");
  if (searchQuery != null && searchQuery != "") {
    searchParams.title = { $regex: searchQuery };
  }

  // filter

  const filter = url.searchParams.get("filter_selector");
  let filterParams = {};

  if (filter != null && filter != "") {
    if (filter == "title_az") {
      //  sort title a-z
      filterParams = { title: 1 };
    }
    if (filter == "title_za") {
      //  sort title a-z
      filterParams = { title: -1 };
    }

    if (filter == "last_updated") {
      //  sort by updated
      // searchParams.sort({date: 1});
      filterParams = { date: -1 };
    }
    if (filter == "fav") {
      //  view favourite
      searchParams.favourite = true;
    }
  }
  searchParams.userId = userId;
  const snippets = await db.models.CodeSnippet.find(searchParams).sort(
    filterParams
  );
  return snippets;

  // const db = await connectDb();
  // const snippets = await db.models.Snippet.find({
  //   userId: session.get("userId"),
  // }).populate("userId");
  // console.log(snippets);
  // return json({ userId: session.get("userId"), snippets });
  // //return snippets;
}
// export async function loader({ request }) {

// // categories
// const category = url.searchParams.get("category");
// var searchParams = {};
// if (category != null && category != "") {
//   searchParams.language = category;
// }

// //  search
// const searchQuery = url.searchParams.get("searchQuery");
// if (searchQuery != null && searchQuery != "") {
//   searchParams.title = { $regex: searchQuery };
// }

// // filter

// const filter = url.searchParams.get("filter_selector");
// let filterParams = {};

// if (filter != null && filter != "") {
//   if (filter == "title_az") {
//     //  sort title a-z
//     filterParams = { title: 1 };
//   }
//   if (filter == "title_za") {
//     //  sort title a-z
//     filterParams = { title: -1 };
//   }

//   if (filter == "last_updated") {
//     //  sort by updated
//     // searchParams.sort({date: 1});
//     filterParams = { date: -1 };
//   }
//   if (filter == "fav") {
//     //  view favourite
//     searchParams.favourite = true;
//   }
// }

// const snippets = await db.models.CodeSnippet.find(
//   searchParams
// ).sort(filterParams);

// return json({ userId: session.get("userId"), snippets });

//return snippets;
//}

export default function Index() {
  var snippets = useLoaderData();
  const [toggle, setToggle] = useState(false);
  const handleClick = (e) => setToggle(!toggle);

  return (
    <div id="content-section">
      <body className=" text-snippet-white-0 font-light font-roboto bg-snippet-dark-0 ">
        <main className=" w-screen h-screen relative">
          <div className="mobile-menu md:hidden absolute z-50 top-4 left-5 ">
            <MobileMenu toggle={toggle} handleClick={handleClick} />
          </div>
          <header className="  w-full py-4  flex justify-between items-center shadow-xl z-20 absolute top-0 left-0 ">
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

            <Form method="post" action="/logout">
              <button
                type="submit"
                className=" md:px-5 md:py-3 py-1 px-3 md:text-base text-sm shadow-lg bg-red-600 mr-5 rounded-md hover:scale-105 transition-all duration-300"
              >
                Log out
              </button>
            </Form>
          </header>
          <div className="relative flex pt-[80px] bg-snippet-dark w-screen h-full ">
            <div
              style={{ left: `${toggle ? 0 : "-100%"}` }}
              className="flex  w-full md:hidden absolute top-0   z-40 h-full  bg-snippet-dark-0 transition-all duration-500"
            >
              <CategoryList />
              <SnippetList
                snippets={snippets}
                toggle={toggle}
                handleClick={handleClick}
              />
            </div>
            {/* for desktop */}
            <div className="md:flex hidden w-[32%]  relative   h-full  bg-snippet-dark-0 transition-all duration-500">
              <CategoryList />
              <SnippetList
                snippets={snippets}
                toggle={toggle}
                handleClick={handleClick}
              />
            </div>
            <div className="flex m-0 justify-around content-around pt-40">
              <div className="m-10  p-5 flex-col text-2xl content-center justify-center  text-center ">
                Go to menu to select & see snippets
              </div>
            </div>
          </div>
        </main>
      </body>
    </div>
  );
}
