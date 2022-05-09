import { useLoaderData, Link, Form } from "@remix-run/react";
import { useState } from "react";
import connectDb from "~/db/connectDb.server";
import SnippetList from "../components/SnippetList";
import CategoryList from "../components/CategoryList";
import MobileMenu from "../components/MobileMenu";

// export async function loader() {
//   const db = await connectDb();
//   const snippets = await db.models.CodeSnippet.find();

//   return snippets;
// }

export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url);

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

  const snippets = await db.models.CodeSnippet.find(searchParams).sort(
    filterParams
  );
  return snippets;
}

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

          <div className="relative flex pt-[80px] bg-snippet-dark w-full h-full ">
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
          </div>
        </main>
      </body>
    </div>
  );
}
