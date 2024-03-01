import { LoginContext } from "@/components/contexts/LoginContext";
import { MockContext } from "@/components/contexts/MockContext";
import Permission from "@/src/interfaces/permission";
import randomDate from "@/src/utils/randomDate";
import randomNumber from "@/src/utils/randomNumber";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PermissionCreatePage() {
  const router = useRouter();
  const { logged } = useContext(LoginContext);
  const { mock, setMock } = useContext(MockContext);
  const { t } = useTranslation();
  const [modified, setModified] = useState(
    mock.permissions.find(
      (permission: Permission) =>
        permission.permissionId === router.query.permissionId
    )
  );
  const [form, setForm] = useState({
    permissionId: randomNumber(10),
    permissionName: modified?.permissionName,
    permissionDetails: modified?.permissionDetails,
    createdAt: randomDate(),
  });
  useEffect(() => {
    if (!logged?.email) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <section className={`flex flex-col gap-5`}>
        <div className="shadow-sm p-6 pl-8 bg-inherit flex flex-col gap-4 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              {t("existing")} {t("dataOfPermission")}
            </h1>
            <Link
              className="pt-2 pb-2 pl-4 pr-4 rounded-md text-center-text-xl bg-gray-500 text-white w-fit "
              href={{ pathname: "/admin/permissions" }}
            >
              {t("permissions")}
            </Link>
          </div>
        </div>
        <div className="m-6 p-2 bg-gray-200 rounded-md dark:bg-gray-800  flex flex-col gap-6">
          <h1 className="text-2xl">
            {t("existing")} {t("dataOfPermission")}
          </h1>
          <form
            className="flex flex-col gap-6 p-6 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
              setMock((prevMock: any) => {
                if (!prevMock) return null;
                return {
                  ...prevMock,
                  permissions: [...prevMock.permissions, form],
                };
              });
              router.push("/admin/permissions");
            }}
          >
            <div className="flex gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("permissionGroupName")}:{" "}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("permissionGroupName")}
                  value={form.permissionName}
                  required
                  onChange={(e) =>
                    setForm({ ...form, permissionName: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col flex-1">
                <span className="text-xl">
                  {t("permissionGroupDetail")}:
                  <span className="text-red-500">*</span>
                </span>
                <textarea
                  required
                  className="border-2 shadow-sm text-xl p-2 rounded-md w-full dark:bg-gray-700 dark:text-white   dark:border-gray-500 outline-blue-500"
                  placeholder={t("permissionGroupDetail")}
                  value={form.permissionDetails}
                  onChange={(e) =>
                    setForm({ ...form, permissionDetails: e.target.value })
                  }
                ></textarea>
                <span>{t("max500Character")}</span>
              </label>
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
