import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import data from "@/mock";
import Category from "@/src/interfaces/category";
import randomDate from "@/src/utils/randomDate";
import randomNumber from "@/src/utils/randomNumber";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CategoriesCreatePage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [modified, setModified] = useState(
    mock?.categories.find(
      (category: Category) => category.categoryId === router.query.categoryId
    )
  );
  const [form, setForm] = useState<Category | any>({
    categoryId: randomNumber(10),
    categoryName: "" || modified?.categoryName,
    categoryDetail: "" || modified?.categoryDetail,
    createdAt: randomDate().toISOString(),
  });
  useEffect(() => {
    if (!logged?.email) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <section className={`flex flex-col gap-5`}>
        <div className="shadow-sm p-6 pl-8 bg-inherit flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              {router.query.categoryId ? t("existing") : t("new")}{" "}
              {t("dataOfCategory")}
            </h1>
            <Link
              className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-gray-500 text-white w-fit"
              href={{ pathname: "/admin/categories" }}
            >
              {t("categories")}
            </Link>
          </div>
        </div>
        <div className="m-6 p-2 rounded-md bg-gray-200 dark:bg-gray-800 flex flex-col gap-6">
          <h1 className="text-2xl">
            {router.query.categoryId ? t("existing") : t("new")}{" "}
            {t("dataOfCategory")}
          </h1>
          <form
            className="flex flex-col gap-6 p-6 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (router.query.categoryId) {
                setMock((prevMock) => ({
                  ...prevMock!,
                  categories: prevMock!.categories.map((category: Category) => {
                    if (category.categoryId === router.query.categoryId) {
                      return form;
                    } else {
                      return category;
                    }
                  }),
                }));
              } else {
                setMock((prevMock) => ({
                  ...prevMock!,
                  categories: [...(prevMock?.categories || []), form],
                }));
              }

              router.push("/admin/categories");
            }}
          >
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("categoryName")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={`${t("categoryName")} *`}
                  value={form.categoryName}
                  name={`categoryName`}
                  required
                  onChange={(e) =>
                    setForm({ ...form, categoryName: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("categoryDetails")}:{" "}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  name={`categoryDetail`}
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={`${t("categoryDetails")} *`}
                  value={form.categoryDetail}
                  onChange={(e) =>
                    setForm({ ...form, categoryDetail: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <button className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-blue-500 text-white w-fit">
                {router.query.categoryId ? t("modify") : t("create")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
