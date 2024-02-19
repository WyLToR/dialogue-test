import {
  Language,
  LanguageContext,
} from "@/components/contexts/LanguageContext";
import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home({ usersData }: any) {
  const [form, setForm] = useState({
    email: "admin@admin.com",
    password: "admin",
  });
  const { mock } = useContext(MockContext);
  const { logged, setLogged } = useContext(LoginContext);
  const [valid, setValid] = useState(true);
  const { language, setLanguage } = useContext(LanguageContext);

  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {});
  return (
    <>
      {logged?.email || (
        <>
          <main className="flex flex-col items-center justify-start lg:justify-center xl:justify-center 2xl:justify-center gap-5 m-5 w-screen h-screen">
            <div className="w-fit lg:w-1/2 lg:h-1/2 xl:w-1/2 xl:h-1/2 2xl:w-1/2 2xl:h-1/2 flex flex-col bg-gray-200 dark:bg-gray-800 p-10 rounded-lg">
              <div className="flex justify-center gap-2 text-xl lg:text-3xl xl:text-3xl 2xl:text-3xl mb-5">
                <button
                  className={`${language == Language.hu && "underline"}`}
                  onClick={() => setLanguage(Language.hu)}
                >
                  Üdvözöljük
                </button>
                <span>/</span>
                <button
                  className={`${language == Language.en && "underline"}`}
                  onClick={() => setLanguage(Language.en)}
                >
                  Welcome
                </button>
              </div>
              <form className="flex p-5 flex-col gap-5 items-center justify-center">
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("email")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500`}
                    placeholder={t("email")}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("password")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="password"
                    className={`border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500`}
                    placeholder={t("password")}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </label>
                <span>
                  {!valid && (
                    <span className="text-red-500">
                      {t("wrongEmailOrPassword")}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const finder = mock.users.find(
                      (user: any) =>
                        form.email === user.email &&
                        form.password === user.password
                    );
                    if (finder) {
                      setLogged({ ...finder });
                      router.push("/admin");
                    } else {
                      setValid(false);
                    }
                  }}
                  className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-blue-500 text-white w-fit"
                >
                  {t("login")}
                </button>
              </form>
            </div>
          </main>
        </>
      )}
    </>
  );
}
