import { useTranslation } from "react-i18next";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) {
  const { t } = useTranslation();
  return (
    <input
      className="p-2 border-2 text-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-blue-500"
      placeholder={`${t("search")}...`}
      value={value}
      onChange={onChange}
      type="text"
    ></input>
  );
}
