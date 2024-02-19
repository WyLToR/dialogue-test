import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import User from "@/src/interfaces/user";
import randomDate from "@/src/utils/randomDate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UsersCreatePage() {
  const router = useRouter();
  const { logged, setLogged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const [isAdmin, setIsAdmin] = useState(
    router.query.super == "false" &&
      router.query.isAdmin == "true" &&
      router.query.key == "123321"
  );
  const { t } = useTranslation();
  const [exist, setExist] = useState(false);
  const [modified, setModified] = useState(
    mock.users.find((user: User) => user.username === router.query.username)
  );
  const [form, setForm] = useState({
    email: "" || modified?.email,
    username: "" || modified?.username,
    password: "",
    passwordAgain: "",
    firstName: "" || modified?.firstName,
    lastName: "" || modified?.lastName,
    img: "https://placehold.co/600x600",
    createdAt: randomDate().toISOString(),
    isAdmin,
    permissions: [],
  });
  useEffect(() => {
    if (!logged?.email) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (!router.query.username) {
      setExist(
        mock.users.some((user: User) => form.username === user.username)
      );
    }
  }, [form.username]);
  return (
    <>
      <section className={`flex flex-col gap-5`}>
        <div className="p-6 pl-8 bg-inherit flex flex-col gap-4 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              {router.query.username ? t("existing") : t("new")}{" "}
              {isAdmin ? t("dataOfAdmins") : t("dataOfUsers")}
            </h1>
            <Link
              className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-gray-500 text-white w-fit"
              href={{
                pathname: "/admin/users",
                query: { isAdmin: isAdmin ? true : false },
              }}
            >
              {isAdmin ? t("menuAdmins") : t("users")}
            </Link>
          </div>
        </div>
        <div className="m-4 p-2 flex flex-col gap-6 bg-gray-200 rounded-md dark:bg-gray-800">
          <h1 className="text-2xl">
            {router.query.username ? t("existing") : t("new")}{" "}
            {isAdmin ? t("dataOfAdmins") : t("dataOfUsers")}
          </h1>
          <form
            className="flex flex-col gap-6 p-6 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
              setMock((prevMock: any) => {
                if (!prevMock) return null;

                if (router.query.username) {
                  return {
                    ...prevMock,
                    users: prevMock.users.map((user: User) => {
                      if (user.username === router.query.username) {
                        if (user.username == logged?.username) {
                          setLogged({
                            email: form.email,
                            username: form.username,
                            password: form.password,
                            firstName: form.firstName,
                            lastName: form.lastName,
                            img: form.img,
                            createdAt: form.createdAt,
                            isAdmin: form.isAdmin,
                            permissions: form.permissions,
                          });
                        }
                        return {
                          email: form.email,
                          username: form.username,
                          password: form.password,
                          firstName: form.firstName,
                          lastName: form.lastName,
                          img: form.img,
                          createdAt: form.createdAt,
                          isAdmin: form.isAdmin,
                          permissions: form.permissions,
                        };
                      } else {
                        return user;
                      }
                    }),
                  };
                } else {
                  return {
                    ...prevMock,
                    users: [
                      ...prevMock.users,
                      {
                        email: form.email,
                        username: form.username,
                        password: form.password,
                        firstName: form.firstName,
                        lastName: form.lastName,
                        img: form.img,
                        createdAt: form.createdAt,
                        isAdmin: form.isAdmin,
                        permissions: form.permissions,
                      },
                    ],
                  };
                }
              });

              router.push(
                `/admin/users${isAdmin ? "?isAdmin=true" : "isAdmin=false"}`
              );
            }}
          >
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("lastName")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("lastName")}
                  value={form.lastName}
                  required
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("firstName")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("firstName")}
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("username")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("username")}
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </label>
              {exist ? <span>{t("userExist")}</span> : ""}
              <span className="text-xl bg-gray-100 dark:bg-gray-700 p-4 italic">
                {t("userCreatorValidInfo")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("email")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("newPassword")}: <span className="text-red-500">*</span>
                </span>
                <input
                  type="password"
                  required={router.query.username ? false : true}
                  className={`border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500 ${
                    form.password !== form.passwordAgain ? "border-red-500" : ""
                  }`}
                  placeholder={t("newPassword")}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("newPasswordAgain")}:
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="password"
                  required={router.query.username ? false : true}
                  className={`border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500 ${
                    form.password !== form.passwordAgain ? "border-red-500" : ""
                  }`}
                  placeholder={t("newPasswordAgain")}
                  value={form.passwordAgain}
                  onChange={(e) =>
                    setForm({ ...form, passwordAgain: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              {form.password == form.passwordAgain ? (
                <span>{t("passwordNeedMatch")}</span>
              ) : (
                <span>{t("passwordDontMatch")}</span>
              )}
            </div>
            <div>
              <button
                disabled={
                  isAdmin
                    ? exist
                      ? true
                      : false &&
                        !router.query.super &&
                        router.query.isAdmin &&
                        router.query.key == "123321"
                    : exist
                    ? true
                    : false
                }
                className={`${
                  exist ? "bg-gray-300" : "bg-blue-500"
                } pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl  text-white w-fit`}
              >
                {router.query.username ? t("modify") : t("create")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
