import User from "@/src/interfaces/user";
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
  logged,
  setDeleteProblem,
  setSuccessModal,
  router,
  handleSortChange,
}: any) {
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="bg-gray-700 text-white min-w-full rounded-md">
          <thead>
            <tr>
              <th
                scope="col"
                className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              ></th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex justify-between items-center">
                  {t("lastName")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "lastName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`ml-2 rounded-full fill-white ${
                        sort.sortBy == "lastName" && sort.orderBy == "asc"
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
                          sortBy: "lastName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`rounded-full fill-white ${
                        sort.sortBy == "lastName" && sort.orderBy == "desc"
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
                className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex justify-between items-center">
                  {t("firstName")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "firstName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "firstName" && sort.orderBy == "asc"
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
                          sortBy: "firstName",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`ml-2 fill-white rounded-full ${
                        sort.sortBy == "firstName" && sort.orderBy == "desc"
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
                className="px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex justify-between items-center">
                  {t("username")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "username",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "username" && sort.orderBy == "asc"
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
                          sortBy: "username",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`ml-2 fill-white rounded-full ${
                        sort.sortBy == "username" && sort.orderBy == "desc"
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
                <div className="flex justify-between items-center">
                  {t("email")}
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleSortChange({
                          sortBy: "email",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`fill-white rounded-full ${
                        sort.sortBy == "email" && sort.orderBy == "asc"
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
                          sortBy: "email",
                          sort,
                          setSort,
                          router,
                        })
                      }
                      className={`ml-2 fill-white rounded-full ${
                        sort.sortBy == "email" && sort.orderBy == "desc"
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
                className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium uppercase"
              >
                <div className="flex justify-between items-center">
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
            {currentItems.map((user: User, idx: number) => (
              <tr
                key={user.email}
                className={idx % 2 != 1 ? "bg-gray-100" : ""}
              >
                <td className="hidden sm:table-cell px-6 whitespace-nowrap text-sm font-medium text-gray-900 relative">
                  <div className="relative w-6 h-6">
                    <img
                      src={user.img}
                      alt={`${user.username} image`}
                      className="absolute rounded-xl inset-0 h-full w-full"
                    />
                    <div className="absolute bottom-0 right-0 bg-gray-400 w-2 h-2 rounded-full"></div>
                  </div>
                </td>

                <td className="hidden lg:table-cell px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                  {user.firstName}
                </td>
                <td className="hidden md:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {user.lastName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="hidden xl:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                  <Link
                    href={{
                      pathname: "/admin/users/create",
                      query: {
                        username: user.username,
                        super: router.query.isAdmin == "true" ? false : true,
                        isAdmin: router.query.isAdmin == "true" ? true : false,
                        key:
                          router.query.isAdmin == "true" ? "123321" : "321123",
                      },
                    }}
                  >
                    <button className="rounded-md fill-white bg-blue-500 border-blue-500 border-2 p-2 hover:bg-blue-500">
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
                      if (logged.username == user.username) {
                        setDeleteProblem(true);
                        setSuccessModal(true);
                      } else {
                        setDeleteItem(user.username);
                        setDeleteModal(true);
                      }
                    }}
                    className="rounded-md border-red-500 border-2 p-2 fill-black hover:bg-red-500"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
