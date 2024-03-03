import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import VerifyModal from "@/components/modal/VerifyModal";
import Spinner from "@/components/spinner/Spinner";
import User from "@/src/interfaces/user";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MyProfilePage() {
  const { logged, setLogged } = useContext(LoginContext);
  const [match, setMatch] = useState(true);
  const { mock, setMock } = useContext(MockContext);
  const [verify, setVerify] = useState<boolean | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [sucessModal, setSuccessModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "" || logged?.email,
    oldPassword: "" || logged?.password,
    username: "" || logged?.username,
    password: "",
    passwordAgain: "",
    lastName: "" || logged?.lastName,
    firstName: "" || logged?.firstName,
    img: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);
  useEffect(() => {
    if (verify !== null) {
      if (verify) {
        setMock((prevMock: any) => {
          if (!prevMock) return null;
          return {
            ...prevMock,
            users: prevMock.users.map((user: User) => {
              if (user.username === logged?.username) {
                return {
                  ...user,
                  email: form.email,
                  username: form.username,
                  password:
                    form.password == "" ? form.oldPassword : form.password,
                  firstName: form.firstName,
                  lastName: form.lastName,
                  img: form.img,
                };
              } else {
                return user;
              }
            }),
          };
        });
        setLogged(null);
        router.push("/");
      }
    }
  }, [verify]);
  return (
    <>
      <VerifyModal
        modal={verifyModal}
        setModal={setVerifyModal}
        setVerify={setVerify}
      >
        {t("afterModifyReLogin")}
      </VerifyModal>
      {!isClient ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <section
            className={`flex flex-col gap-5 ${
              !modal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div className="p-6 pl-8 bg-inherit shadow-sm">
              <h1 className="text-3xl">{t('myProfile')}</h1>
            </div>
            <div className="p-5 m-2 flex flex-col gap-5 items-start rounded-md bg-gray-100 dark:bg-gray-800">
              <button type="button" className="text-xl">
              {t('modifyProfilePicture')}
              </button>
              <img
                className="rounded-full"
                width={100}
                height={100}
                src={logged?.img || "https://placehold.co/600x600"}
              />
            </div>
            <div className="m-2 p-5 flex flex-col gap-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <h3 className="text-2xl">{t('modifyName')}</h3>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col">
                  <span className="text-xl">
                  {t('lastName')}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t('lastName')}
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("firstName")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("firstName")}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <div className="p-5 m-2 flex flex-col gap-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <h3 className="text-2xl">{t("modifyEmail")}</h3>
              <form className="flex flex-col gap-5">
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("email")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("email")}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </label>
              </form>
            </div>
            <div className="p-5 m-2 flex flex-col gap-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <h3 className="text-2xl">{t("modifyUsername")}</h3>
              <form className="flex flex-col gap-5">
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("username")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("username")}
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </label>
              </form>
            </div>
            <div className="p-5 m-2 flex flex-col gap-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <h3 className="text-2xl flex gap-5">
                {t("modifyPassword")}
                <button
                  type="button"
                  className="fill-white dark:fill-gray-200"
                  onClick={() => setShowPw(!showPw)}
                >
                  {!showPw ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                    </svg>
                  )}
                </button>
              </h3>
              <form className="flex flex-col gap-5">
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("existingPassword")}:{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="password"
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("existingPassword")}
                    value={form.oldPassword}
                    onChange={(e) =>
                      setForm({ ...form, oldPassword: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("newPassword")}: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("newPassword")}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-xl">
                    {t("newPasswordAgain")}:{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    className="border-2 shadow-sm text-xl p-2 rounded-md dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                    placeholder={t("newPassword")}
                    value={form.passwordAgain}
                    onChange={(e) =>
                      setForm({ ...form, passwordAgain: e.target.value })
                    }
                  />
                </label>
                {form.password == form.passwordAgain || (
                  <span>{t("passwordDontMatch")}</span>
                )}
              </form>
              <button
                type="button"
                onClick={() => {
                  setVerifyModal(true);
                }}
                className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-blue-500 text-white w-fit"
              >
                {t("modify")}
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
