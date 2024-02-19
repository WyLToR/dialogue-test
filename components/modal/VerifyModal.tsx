import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";

export default function VerifyModal({
  modal,
  setModal,
  setVerify,
  children,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean | null>>;
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
          <div className="rounded-lg px-16 py-14 z-10">
            <div className="flex justify-center flex-col items-center">
              <p className={`w-[230px] text-center font-normal text-gray-600`}>
                {children}
              </p>
              <div>
                <button
                  onClick={() => {
                    setModal(!modal);
                    setVerify(true);
                  }}
                  className={`${
                    modal ? "block" : "none"
                  } mx-auto mt-10 rounded-xl border-4 border-transparent bg-green-400 px-6 py-3 pl-10 pr-10 text-center text-base font-medium text-black-100`}
                >
                  {t("modalVerifyVerify")}
                </button>
                <button
                  onClick={() => {
                    setModal(!modal);
                    setVerify(false);
                  }}
                  className={`${
                    modal ? "block" : "none"
                  } mx-auto mt-10 rounded-xl border-4 border-transparent bg-blue-400 px-6 py-3 text-center text-base font-medium text-black-100`}
                >
                  {t("modalVerifyCancel")}
                </button>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </>
  );
}
