import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import SearchBar from "@/components/table/SearchBar";
import RenderTable from "@/components/table/categoriesTable";
import Category from "@/src/interfaces/category";
import handleSearchChange from "@/src/utils/handleSearch";
import handleSortChange from "@/src/utils/handleSort";
import compareElements from "@/src/utils/handleSortCompare";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function CategoriesPage() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sucessModal, setSuccessModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string>("");
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([...mock.categories]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearch(searchParams.get("search") || "");
    setSort({
      sortBy: searchParams.get("sortBy"),
      orderBy: searchParams.get("orderBy"),
    });
  }, [router.query.search, router.query.sortBy, router.query.orderBy]);
  useEffect(() => {
    setCurrentPage(1);
    if (sort !== null) {
      setCategories(
        [...mock.categories]
          .sort((a: any, b: any) => compareElements(a, b, { sort }))
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
          <SearchBar
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange({ search: e.target.value, setSearch, router })
            }
          />
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
                handleSortChange={handleSortChange}
                router={router}
              />
            </Paginator>
          </>
        )}
      </section>
    </>
  );
}
