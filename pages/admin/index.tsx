import { useContext } from "react";
import Link from "next/link";
import { MockContext } from "@/components/contexts/MockContext";
import { useTranslation } from "react-i18next";
export default function AdminPage() {
  const { mock } = useContext(MockContext);
  const { t } = useTranslation();
  return (
    <>
      <div className="shadow-sm p-6 pl-8 bg-inherit max-h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href={{ pathname: "/admin/my-profile"}}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
              </svg>
            </span>
            <span className="text-xl uppercase"> {t("myProfile")}</span>
          </Link>
          <Link
            href={{ pathname: "/admin/users" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
              </svg>
            </span>
            <span className="text-xl uppercase"> {t("users")}</span>
            <span className="text-xl uppercase">
              {mock["users"].length} {t("quantity")}
            </span>
          </Link>
          <Link
            href={{ pathname: "/admin/permissions" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z" />
              </svg>
            </span>
            <span className="text-xl uppercase"> {t("permissionGroups")}</span>
            <span className="text-xl uppercase">
              {mock["permissions"].length} {t("quantity")}
            </span>
          </Link>
          <Link
            href={{ pathname: "/admin/pages" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
            </span>
            <span className="text-xl uppercase"> {t("pages")}</span>
            <span className="text-xl uppercase">
              {mock["pages"].length} {t("quantity")}
            </span>
          </Link>
          <Link
            href={{ pathname: "/admin/categories" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
              </svg>
            </span>
            <span className="text-xl uppercase"> {t("categories")}</span>
            <span className="text-xl uppercase">
              {mock["categories"].length} {t("quantity")}
            </span>
          </Link>
          <Link
            href={{ pathname: "/admin/gallery" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-center items-center flex-col p-6"
          >
            <span className="w-16 h-16 mb-4 fill-gray-800 dark:fill-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M120-200q-33 0-56.5-23.5T40-280v-400q0-33 23.5-56.5T120-760h400q33 0 56.5 23.5T600-680v400q0 33-23.5 56.5T520-200H120Zm600-320q-17 0-28.5-11.5T680-560v-160q0-17 11.5-28.5T720-760h160q17 0 28.5 11.5T920-720v160q0 17-11.5 28.5T880-520H720Zm40-80h80v-80h-80v80ZM120-280h400v-400H120v400Zm40-80h320L375-500l-75 100-55-73-85 113Zm560 160q-17 0-28.5-11.5T680-240v-160q0-17 11.5-28.5T720-440h160q17 0 28.5 11.5T920-400v160q0 17-11.5 28.5T880-200H720Zm40-80h80v-80h-80v80Zm-640 0v-400 400Zm640-320v-80 80Zm0 320v-80 80Z" />
              </svg>
            </span>
            <span className="text-xl uppercase">{t("gallery")}</span>
            <span className="text-xl uppercase">
              {mock["gallery"].length} {t("quantity")}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
