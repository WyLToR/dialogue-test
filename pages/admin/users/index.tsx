import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import SearchBar from "@/components/table/SearchBar";
import RenderTable from "@/components/table/usersTable";
import User from "@/src/interfaces/user";
import handleSearchChange from "@/src/utils/handleSearch";
import handleSortChange from "@/src/utils/handleSort";
import compareElements from "@/src/utils/handleSortCompare";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UsersPage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User | any>([...mock.users]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [sucessModal, setSuccessModal] = useState(false);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteProblem, setDeleteProblem] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);
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
  useEffect(() => {
    if (sort !== null) {
      setUsers(
        [
          ...mock.users.filter((user: User) =>
            router.query.isAdmin == "true" ? user.isAdmin : user
          ),
        ]
          .sort((a: any, b: any) => compareElements(a, b, { sort }))
          .filter((user: User) =>
            search
              ? user.firstName.toLocaleLowerCase().includes(search) ||
                user.lastName.toLocaleLowerCase().includes(search) ||
                user.email.toLocaleLowerCase().includes(search) ||
                user.username.toLocaleLowerCase().includes(search)
              : user
          )
      );
    }
  }, [sort, search, router.query.isAdmin, verify]);
  useEffect(() => {
    if (deleteItem == logged?.username) {
      setDeleteProblem(true);
    } else {
      if (verify !== null) {
        if (verify) {
          setMock((prevMock: any) => {
            if (!prevMock) return null;
            return {
              ...prevMock,
              users: prevMock.users.filter(
                (user: User) => user.username !== deleteItem
              ),
            };
          });
          setSuccessModal(true);
        } else if (verify === false) {
          setSuccessModal(false);
        }
        setVerify(null);
        setDeleteItem(null);
        setDeleteProblem(false);
      }
    }
  }, [verify, deleteProblem]);

  return (
    <>
      <>
        <VerifyModal
          modal={deleteModal}
          setModal={setDeleteModal}
          setVerify={setVerify}
        >
          {t("modalVerifyDelete")}
        </VerifyModal>
        <SuccessModal modal={sucessModal} setModal={setSuccessModal}>
          {t(`${deleteProblem ? "deleteYourself" : "modalSuccessDelete"}`)}
        </SuccessModal>
      </>

      <section
        className={`flex flex-col gap-5 ${
          !modal ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="m-2 rounded-md border-2 shadow-sm p-6 pl-8 bg-gray-200 flex flex-col gap-4 dark:bg-gray-800 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              {router.query.isAdmin == "true" ? t("menuAdmins") : t("users")}
            </h1>
            <Link
              className="p-2 rounded-md text-center-text-l bg-green-500 text-white w-fit"
              href={{
                pathname: "/admin/users/create",
                query: {
                  super: router.query.isAdmin == "true" ? false : true,
                  isAdmin: router.query.isAdmin == "true" ? true : false,
                  key: router.query.isAdmin == "true" ? "123321" : "321123",
                },
              }}
            >
              + {router.query.isAdmin == "true" ? t("newAdmin") : t("newUser")}
            </Link>
          </div>
          <div className="flex gap-4">
            <button className="border-2 text-nowrap border-blue-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {router.query.isAdmin == "true" ? t("menuAdmins") : t("users")}
            </button>
            <button className="border-2 text-nowrap border-gray-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {router.query.isAdmin == "true"
                ? t("deletedAdmins")
                : t("deletedUsers")}
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
      <section className="m-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2">
        {!isClient ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <Paginator
              data={users}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <RenderTable
                data={users}
                sort={sort}
                setSort={setSort}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setDeleteModal={setDeleteModal}
                t={t}
                setDeleteItem={setDeleteItem}
                logged={logged}
                setDeleteProblem={setDeleteProblem}
                setSuccessModal={setSuccessModal}
                router={router}
                handleSortChange={handleSortChange}
              />
            </Paginator>
          </>
        )}
      </section>
    </>
  );
}
