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
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        setModal(false);
        setVerify(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal, setModal, setVerify]);
  return (
    <>
      <div className="relative flex justify-center items-center h-full">
        <ReactModal
          shouldCloseOnEsc={true}
          isOpen={modal}
          ariaHideApp={false}
          className={{
            base: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-800 opacity-90 rounded-lg p-8",
            afterOpen: "opacity-100 transition-all duration-500 ease-in-out",
            beforeClose: "opacity-0 duration-300",
          }}
          overlayClassName={{
            base: "bg-inherit",
            afterOpen: "",
            beforeClose: "",
          }}
          onRequestClose={() => setModal(!modal)}
          shouldCloseOnOverlayClick={true}
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
