import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import ViewerModal from "@/components/modal/ViewerModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import Picture from "@/src/interfaces/picture";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function GalleryPage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mock, setMock } = useContext(MockContext);
  const [viewImg, setViewImg] = useState("");
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string | null>(null);
  const [pictures, setPictures] = useState([...mock.gallery]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [sucessModal, setSuccessModal] = useState(false);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [deleteItem, setDeleteItem] = useState(null);
  useEffect(() => {
    if (!logged?.email) {
      router.push("/");
    }
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);
  useEffect(() => {
    if (sort !== null) {
      setPictures(
        [...mock.gallery]
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
          .filter((picture: Picture | any) =>
            search
              ? picture.pictureName.toLocaleLowerCase().includes(search) ||
                picture.pictureAlt.toLocaleLowerCase().includes(search)
              : picture
          )
      );
    }
  }, [sort, search,verify]);
  useEffect(() => {
    if (verify !== null) {
      if (verify) {
        setMock((prevMock: any) => {
          if (!prevMock) return null;
          return {
            ...prevMock,
            gallery: prevMock.gallery.filter(
              (picture: Picture) => picture.pictureId !== deleteItem
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
      <ViewerModal modal={viewModal} setModal={setViewModal}>
        <img src={viewImg} />
      </ViewerModal>
      <section
        className={`flex flex-col gap-5 ${
          !viewModal || !deleteModal
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <div className="m-2 rounded-md border-2 shadow-sm p-6 pl-8 bg-gray-200 flex flex-col gap-4 dark:bg-gray-800 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              {t("gallery")}
            </h1>
            <Link
              className="p-2 rounded-md text-center-text-l bg-green-500 text-white w-fit"
              href={{ pathname: "/admin/gallery/create" }}
            >
              + {t("newPicture")}
            </Link>
          </div>
          <div className="flex gap-4">
            <button className="border-2 text-nowrap border-blue-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("pictures")}
            </button>
            <button className="border-2 text-nowrap border-gray-400 rounded-2xl pl-4 pr-4 pt-1 pb-1">
              {t("deletedPictures")}
            </button>
          </div>
          <input
            className="p-2 border-2 text-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-blue-500"
            placeholder={`${t("search")}...`}
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          ></input>
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
              data={pictures}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              <RenderTable
                data={pictures}
                sort={sort}
                setSort={setSort}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setViewer={setViewImg}
                setViewModal={setViewModal}
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
  setViewer,
  setViewModal,
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
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium uppercase"
            ></th>
            <th scope="col" className="px-6 py-3 text-xs font-medium uppercase">
              <div className="flex gap-2 items-center">
                {t("pictureName")}
                <div className="flex">
                  <button
                    onClick={(e) => {
                      setSort({
                        sortBy: "pictureName",
                        orderBy: "asc",
                      });
                    }}
                    className={`rounded-full fill-white ${
                      sort.sortBy == "pictureName" && sort.orderBy == "asc"
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
                        sortBy: "pictureName",
                        orderBy: "desc",
                      })
                    }
                    className={`rounded-full fill-white ${
                      sort.sortBy == "pictureName" && sort.orderBy == "desc"
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
            <th scope="col" className="px-6 py-3 text-xs font-medium uppercase">
              <div className="flex gap-2 items-center">
                {t("pictureAlt")}
                <div className="flex">
                  <button
                    onClick={(e) => {
                      setSort({
                        sortBy: "pictureAlt",
                        orderBy: "asc",
                      });
                    }}
                    className={`rounded-full fill-white ${
                      sort.sortBy == "pictureAlt" && sort.orderBy == "asc"
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
                        sortBy: "pictureAlt",
                        orderBy: "desc",
                      })
                    }
                    className={`rounded-full fill-white ${
                      sort.sortBy == "pictureAlt" && sort.orderBy == "desc"
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
          {currentItems.map((picture: any, idx: number) => (
            <tr
              key={picture.pictureId}
              className={idx % 2 != 1 ? "bg-gray-100" : ""}
            >
              <td className="px-6 whitespace-nowrap text-sm font-medium text-gray-900 relative">
                <button
                  className="relative w-6 h-6"
                  onClick={() => {
                    setViewModal(true);
                    setViewer(picture.pictureHref);
                  }}
                >
                  <img
                    src={picture.pictureHref}
                    alt={picture.pictureAlt}
                    className="rounded-full absolute inset-0 h-full w-full"
                  />
                </button>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {picture.pictureName}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {picture.pictureAlt}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                {new Date(picture.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 flex items-center float-end gap-2 fill-black">
                <Link
                  className="rounded-md bg-blue-500 border-blue-500 border-2 p-2 hover:bg-blue-500"
                  href={{
                    pathname: "/admin/gallery/create",
                    query: {
                      pictureId: picture.pictureId,
                    },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="15"
                    viewBox="0 -960 960 960"
                    width="15"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setDeleteItem(picture.pictureId);
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
