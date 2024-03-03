import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import SuccessModal from "@/components/modal/SuccessModal";
import VerifyModal from "@/components/modal/VerifyModal";
import ViewerModal from "@/components/modal/ViewerModal";
import Paginator from "@/components/paginator/Paginator";
import Spinner from "@/components/spinner/Spinner";
import SearchBar from "@/components/table/SearchBar";
import RenderTable from "@/components/table/galleryTable";
import Picture from "@/src/interfaces/picture";
import handleSearchChange from "@/src/utils/handleSearch";
import handleSortChange from "@/src/utils/handleSort";
import compareElements from "@/src/utils/handleSortCompare";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function GalleryPage() {
  const router = useRouter();
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mock, setMock } = useContext(MockContext);
  const [viewImg, setViewImg] = useState(0);
  const [sort, setSort] = useState<{
    sortBy: string | null;
    orderBy: string | null;
  } | null>({ sortBy: null, orderBy: null });
  const [search, setSearch] = useState<string>("");
  const [pictures, setPictures] = useState([...mock.gallery]);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [sucessModal, setSuccessModal] = useState(false);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [deleteItem, setDeleteItem] = useState(null);
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
      setPictures(
        [...mock.gallery]
          .sort((a: any, b: any) => compareElements(a, b, { sort }))
          .filter((picture: Picture | any) =>
            search
              ? picture.pictureName.toLocaleLowerCase().includes(search) ||
                picture.pictureAlt.toLocaleLowerCase().includes(search)
              : picture
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
      <ViewerModal
        modal={viewModal}
        setModal={setViewModal}
        galleryData={pictures}
        actualImg={viewImg}
        setActualImg={setViewImg}
      />
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
