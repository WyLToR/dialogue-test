import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import Page from "@/src/interfaces/page";
import randomDate from "@/src/utils/randomDate";
import randomNumber from "@/src/utils/randomNumber";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PagesCreatePage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [modified, setModified] = useState(
    mock.pages.find((page: Page) => page.pageId === router.query.pageId)
  );
  const [form, setForm] = useState({
    pageId: randomNumber(10),
    pageName: modified?.pageName,
    pageHref: modified?.pageHref,
    pageVisible: modified?.pageVisible,
    createdAt: randomDate(),
  });
  return (
    <>
      <section className={`flex flex-col gap-5`}>
        <div className="shadow-sm p-6 pl-8 bg-inherit flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              {t("existing")} {t("dataOfPage")}
            </h1>
            <Link
              className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-gray-500 text-white w-fit"
              href={{ pathname: "/admin/pages" }}
            >
              {t("pages")}
            </Link>
          </div>
        </div>
        <div className="m-6 rounded-md bg-gray-200 dark:bg-gray-800 p-2 flex flex-col gap-6">
          <h1 className="text-2xl">
            {t("existing")} {t("dataOfPage")}
          </h1>
          <div className="flex justify-between m-5">
            <button className="w-1/2 flex justify-center items-center border-b-2 border-b-blue-700 pb-4">
              <span className="text-2xl text-blue-700">{t("dataOfPage")}</span>
            </button>
            <button className="w-1/2 flex justify-center items-center border-b-blue-700 pb-4">
              <span className="text-2xl">{t("seoOfPage")}</span>
            </button>
          </div>
          <form
            className="flex flex-col gap-6 p-6 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
              setMock((prevMock: any) => {
                if (!prevMock) return null;
                if (router.query.pageId) {
                  return {
                    ...prevMock,
                    pages: prevMock.pages.map((page: Page) => {
                      if (page.pageId === router.query.pageId) {
                        return form;
                      } else {
                        return page;
                      }
                    }),
                  };
                }
              });
              router.push("/admin/pages");
            }}
          >
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("pageName")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("pageName")}
                  value={form.pageName}
                  required
                  onChange={(e) =>
                    setForm({ ...form, pageName: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("pageReference")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("pageReference")}
                  value={form.pageHref}
                  onChange={(e) =>
                    setForm({ ...form, pageHref: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <input
                className={`mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] 
                bg-neutral-300 before:pointer-events-none before:absolute 
                before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent 
                before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
                after:h-5 after:w-5 after:rounded-full after:border-none 
                after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
                after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] 
                checked:bg-red-500
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
                checked={form.pageVisible}
                onClick={(e) =>
                  setForm({ ...form, pageVisible: !form.pageVisible })
                }
              />
              <span>{t("public")}</span>
            </div>
            <div>
              <button className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-blue-500 text-white w-fit">
                {t("modify")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
