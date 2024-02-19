import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import Category from "@/src/interfaces/category";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function CategoriesPage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sucessModal, setSuccessModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string | null>(null);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([...mock.categories]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!logged?.email) {
      router.push("/");
    }
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    if (sort !== null) {
      setCategories(
        [...mock.categories]
          .sort((a: any, b: any) => {
            if (sort.sortBy === "createdAt") {
              const dateA = new Date(a.createdAt) as Date;
              const dateB = new Date(b.createdAt) as Date;
              return sort.orderBy === "asc"
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
            } else {
              return sort.orderBy === "asc"
                ? a[sort.sortBy || ""] < b[sort.sortBy || ""]
                  ? -1
                  : 1
                : a[sort.sortBy || ""] > b[sort.sortBy || ""]
                ? -1
                : 1;
            }
          })
          .filter((category: Category) =>
            search
              ? category.categoryName.toLocaleLowerCase().includes(search)
              : category
          )
      );
    }
  }, [sort, search, verify]);
  useEffect(() => {
    if (verify !== null) {
      if (verify) {
        setMock((prevMock: any) => {
          if (!prevMock) return null;
          return {
            ...prevMock,
            categories: prevMock.categories.filter(
              (category: Category) => category.categoryId !== deleteItem
            ),
          };
        });
        setSuccessModal(true);
        setVerify(null);
      }
    }
  }, [verify]);
  return (
    <>
      <VerifyModal
        modal={deleteModal}
        setModal={setDeleteModal}
        setVerify={setVerify}
      >
        {t("modalVerifyDelete")}
      </VerifyModal>
      <SuccessModal modal={sucessModal} setModal={setSuccessModal}>
        {t("modalSuccessDelete")}
      </SuccessModal>
      <section
        className={`flex flex-col gap-5 ${
          !modal ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="m-2 rounded-md shadow-sm p-6 pl-8 bg-gray-200 dark:bg-gray-800 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              {t("categories")}
            </h1>
            <Link
              className="p-2 rounded-md text-center-text-l bg-green-500 text-white w-fit"
              href={{ pathname: "/admin/categories/create" }}
            >
              + {t("newCategory")}
            </Link>
          </div>
          <div className="flex gap-4">
            <button className="border-2 text-nowrap border-blue-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("categories")}
            </button>
            <button className="border-2 text-nowrap border-gray-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("deletedCategories")}
            </button>
          </div>
          <input
            className="p-2 border-2 text-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-blue-500"
            placeholder="Keresés ..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          ></input>
        </div>
      </section>
      <section className="m-2">
        {!isClient ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <Paginator
              data={categories}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <RenderTable
                data={categories}
                sort={sort}
                setSort={setSort}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setDeleteModal={setDeleteModal}
                t={t}
                setDeleteItem={setDeleteItem}
              />
            </Paginator>
          </>
        )}
      </section>
    </>
  );
}

const RenderTable = ({
  data,
  itemsPerPage,
  currentPage,
  sort,
  setSort,
  setDeleteModal,
  t,
  setDeleteItem,
}: any) => {
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);
  return (
    <>
      <table className="bg-gray-700 text-white min-w-full rounded-md shadow-md">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium uppercase">
              <div className="flex gap-2 items-center">
                {t("categoryName")}
                <div className="flex">
                  <button
                    onClick={(e) => {
                      setSort({
                        sortBy: "categoryName",
                        orderBy: "asc",
                      });
                    }}
                    className={`rounded-full fill-white ${
                      sort.sortBy == "categoryName" && sort.orderBy == "asc"
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
                      setSort({
                        sortBy: "categoryName",
                        orderBy: "desc",
                      })
                    }
                    className={`rounded-full fill-white ${
                      sort.sortBy == "categoryName" && sort.orderBy == "desc"
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
              <div className="flex gap-2 items-center">
                {t("modified")}
                <div className="flex">
                  <button
                    onClick={() =>
                      setSort({
                        sortBy: "createdAt",
                        orderBy: "asc",
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
                      setSort({
                        sortBy: "createdAt",
                        orderBy: "desc",
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
          {currentItems.map((category: Category, idx: number) => (
            <tr
              key={category.categoryId}
              className={idx % 2 != 1 ? "bg-gray-100" : ""}
            >
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {category.categoryName}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 flex justify-end gap-2 fill-black">
                <Link
                  href={{
                    pathname: "/admin/categories/create",
                    query: {
                      categoryId: category.categoryId,
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
                    setDeleteItem(category.categoryId);
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
