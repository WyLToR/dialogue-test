import Picture from "@/src/interfaces/picture";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";

export default function ViewerModal({
  modal,
  setModal,
  galleryData,
  actualImg,
  setActualImg,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  galleryData: Picture[];
  actualImg: number;
  setActualImg: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { t } = useTranslation();
  const [currentItemIndex, setCurrentItemIndex] = useState(actualImg);
  const handlePrev = () => {
    setCurrentItemIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentItemIndex((prevIndex) =>
      Math.min(galleryData.length - 1, prevIndex + 1)
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        setModal(false);
        setActualImg(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal, setModal]);

  return (
    <>
      <div className="relative flex justify-center items-center h-full">
        <ReactModal
          shouldCloseOnEsc={true}
          isOpen={modal}
          ariaHideApp={false}
          className={{
            base: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-800 rounded-lg p-8",
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
          <div className="flex justify-center items-center text-center">
            <img
              src={galleryData[currentItemIndex].pictureHref}
              alt="picture"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handlePrev}
              className={`${
                modal ? "block" : "none"
              } mx-auto rounded-xl border-4 border-transparent bg-blue-600 px-6 py-3 text-center text-base font-medium text-black`}
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                setModal(!modal);
                setActualImg(0);
              }}
              className={`${
                modal ? "block" : "none"
              } mx-auto mt-3 rounded-xl border-4 border-transparent bg-blue-600 px-6 py-3 text-center text-base font-medium text-black`}
            >
              {t("modalSuccessViewerClose")}
            </button>
            <button
              onClick={handleNext}
              className={`${
                modal ? "block" : "none"
              } mx-auto rounded-xl border-4 border-transparent bg-blue-600 px-6 py-3 text-center text-base font-medium text-black`}
            >
              {">"}
            </button>
          </div>
        </ReactModal>
      </div>
    </>
  );
}
