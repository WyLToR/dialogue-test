import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import SearchBar from "@/components/table/SearchBar";
import RenderTable from "@/components/table/pagesTable";
import Page from "@/src/interfaces/page";
import handleSearchChange from "@/src/utils/handleSearch";
import handleSortChange from "@/src/utils/handleSort";
import compareElements from "@/src/utils/handleSortCompare";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PagesPage() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string>("");
  const [pages, setpages] = useState([...mock.pages]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sucessModal, setSuccessModal] = useState(false);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [deleteItem, setDeleteItem] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  });
  useEffect(() => {
    setCurrentPage(1);
    if (sort !== null) {
      setpages(
        [...mock.pages]
          .sort((a: any, b: any) => compareElements(a, b, { sort }))
          .filter((page: Page | any) =>
            search ? page.pageName.toLocaleLowerCase().includes(search) : page
          )
      );
    }
  }, [sort, search, verify, mock]);
  useEffect(() => {
    if (verify !== null) {
      if (verify) {
        setMock((prevMock: any) => {
          if (!prevMock) return null;
          return {
            ...prevMock,
            pages: prevMock.pages.filter(
              (page: Page) => page.pageId !== deleteItem
            ),
          };
        });
        setSuccessModal(true);
        setVerify(null);
      }
    }
  }, [verify]);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = Number(searchParams.get("page"));
    setSearch(searchParams.get("search") || "");
    setSort({
      sortBy: searchParams.get("sortBy"),
      orderBy: searchParams.get("orderBy"),
    });
    if (page && !isNaN(page) && page >= 1) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [
    router.query.search,
    router.query.sortBy,
    router.query.orderBy,
    router.query.page,
  ]);
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
        <div className="m-2 rounded-md border-2 shadow-sm p-6 pl-8 bg-gray-200 flex flex-col gap-4 dark:bg-gray-800 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              {t("pages")}
            </h1>
            <Link
              className="p-2 rounded-md text-center-text-l bg-green-500 text-white w-fit"
              href={{ pathname: "/admin/pages/create" }}
            >
              + {t("newPage")}
            </Link>
          </div>
          <div className="flex gap-4">
            <button className="border-2 text-nowrap border-blue-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("pages")}
            </button>
            <button className="border-2 text-nowrap border-gray-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("deletedPages")}
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
      <section className="m-2 rounded-md p-2 bg-gray-200 dark:bg-gray-800">
        {!isClient ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <Paginator
              data={pages}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <RenderTable
                data={pages}
                sort={sort}
                setSort={setSort}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setDeleteModal={setDeleteModal}
                t={t}
                setDeleteItem={setDeleteItem}
                setMock={setMock}
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
