import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";

export default function ViewerModal({
  modal,
  setModal,
  children,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative flex justify-center items-center bg-inherit">
        <ReactModal
          shouldCloseOnEsc={true}
          isOpen={modal}
          ariaHideApp={false}
          overlayClassName={{
            base: "fixed inset-0 bg-opacity-50 bg-black",
            afterOpen: "opacity-100",
            beforeClose: "opacity-0",
          }}
          className={{
            base: "flex h-full items-center justify-center flex-col",
            afterOpen:
              "opacity-100 transition-all duration-500 ease-in-out transform translate-z-0",
            beforeClose: "opacity-0 -translate-x-full duration-300",
          }}
        >
          <div className="flex justify-center items-center text-center">
            {children}
          </div>
          <button
            onClick={() => setModal(!modal)}
            className={`${
              modal ? "block" : "none"
            } mx-auto mt-10 rounded-xl border-4 border-transparent bg-blue-400 px-6 py-3 text-center text-base font-medium text-black-100`}
          >
            {t("modalSuccessViewerClose")}
          </button>
        </ReactModal>
      </div>
    </>
  );
}