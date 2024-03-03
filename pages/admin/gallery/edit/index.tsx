import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import data from "@/mock";
import Picture from "@/src/interfaces/picture";
import randomDate from "@/src/utils/randomDate";
import randomNumber from "@/src/utils/randomNumber";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function GalleryCreatePage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [modified, setModified] = useState(
    mock.gallery.find(
      (picture: Picture) => picture.pictureId === router.query.pictureId
    )
  );
  const [form, setForm] = useState({
    pictureId: randomNumber(20),
    pictureName: modified?.pictureName,
    pictureAlt: modified?.pictureAlt,
    pictureHref: modified?.pictureHref,
    createdAt: randomDate(),
  });
  return (
    <>
      <section className={`flex flex-col gap-5`}>
        <div className="shadow-sm p-6 pl-8 bg-inherit flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              {t("existing")} {t("dataOfPicture")}
            </h1>
            <Link
              className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-gray-500 text-white w-fit"
              href={{ pathname: "/admin/gallery" }}
            >
              {t("gallery")}
            </Link>
          </div>
        </div>
        <div className="m-6 rounded-md bg-gray-200 dark:bg-gray-800 p-2 flex flex-col gap-6">
          <h1 className="text-2xl">
            {t("existing")} {t("dataOfPicture")}
          </h1>
          <form
            className="flex flex-col gap-6 p-6 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
              setMock((prevMock: any) => {
                if (!prevMock) return null;
                return {
                  ...prevMock,
                  gallery: [...prevMock.gallery, form],
                };
              });
              router.push("/admin/gallery");
            }}
          >
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("pictureName")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={`${t("pictureName")}`}
                  value={form.pictureName}
                  required
                  onChange={(e) =>
                    setForm({ ...form, pictureName: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("pictureAlt")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={`${t("pictureAlt")}`}
                  value={form.pictureAlt}
                  onChange={(e) =>
                    setForm({ ...form, pictureAlt: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <div className="mb-3">
                  <label className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                    <span className="text-xl">
                      {t("pictureFile")}:<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    className="relative p-2 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                  />
                </div>
              </label>
            </div>
            <div>
              <button className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-blue-500 text-white w-fit">
                {t("create")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
