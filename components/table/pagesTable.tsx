import Page from "@/src/interfaces/page";
import Link from "next/link";

export default function RenderTable({
  data,
  itemsPerPage,
  currentPage,
  sort,
  setSort,
  setDeleteModal,
  t,
  setDeleteItem,
  setMock,
  handleSortChange,
  router,
}: any) {
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="bg-gray-700 text-white min-w-full rounded-md shadow-md">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase"
              >
                <div className="flex gap-2 items-center">
                  {t("pageName")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "pageName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`rounded-full fill-white ${
                        sort.sortBy == "pageName" && sort.orderBy == "asc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "pageName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`rounded-full fill-white ${
                        sort.sortBy == "pageName" && sort.orderBy == "desc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex gap-2 items-center">
                  {t("public")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "pageVisible",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "pageVisible" && sort.orderBy == "asc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "pageVisible",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "pageVisible" && sort.orderBy == "desc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex gap-2 items-center">
                  {t("modified")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "createdAt",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "createdAt" && sort.orderBy == "asc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "createdAt",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "createdAt" && sort.orderBy == "desc"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((page: any, idx: number) => (
              <tr
                key={page.pageName}
                className={idx % 2 != 1 ? "bg-gray-100" : ""}
              >
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {page.pageName}
                </td>
                <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  <input
                    className={`mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] 
                  bg-neutral-300 before:pointer-events-none before:absolute 
                  before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent 
                  before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
                  after:h-5 after:w-5 after:rounded-full after:border-none 
                  after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
                  after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] 
                  checked:bg-red-500 dark:checked:bg-red-500
                  checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] 
                  checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 
                  checked:after:rounded-full checked:after:border-none checked:after:bg-primary 
                  checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
                  checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] 
                  hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 
                  focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
                  focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute 
                  focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 
                  focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary 
                  checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 
                  checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
                  checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                  dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary 
                  dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] 
                  dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`}
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={page.pageVisible}
                    onChange={() => {
                      setMock((prevMock: any) => {
                        if (!prevMock) return null;
                        return {
                          ...prevMock,
                          pages: prevMock.pages.map((pageData: Page) => {
                            if (pageData.pageId === page.pageId) {
                              return {
                                ...pageData,
                                pageVisible: !page.pageVisible,
                              };
                            } else {
                              return pageData;
                            }
                          }),
                        };
                      });
                    }}
                  />
                </td>
                <td className="hidden md:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(page.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 flex justify-end gap-2 fill-black">
                  <Link
                    href={{
                      pathname: "/admin/pages/edit",
                      query: {
                        pageId: page.pageId,
                      },
                    }}
                  >
                    <button className="rounded-md bg-blue-500 border-blue-500 border-2 p-2 hover:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="15"
                        viewBox="0 -960 960 960"
                        width="15"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                      setDeleteItem(page.pageId);
                    }}
                    className="rounded-md border-red-500 border-2 p-2 hover:bg-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15"
                      viewBox="0 -960 960 960"
                      width="15"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                  <button className="rounded-md border-blue-500 fill-blue-500 border-2 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
