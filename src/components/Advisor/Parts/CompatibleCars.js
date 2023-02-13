import { React } from "react";
import Popup from "reactjs-popup";


export default function CompactibleModal(props) {
  return (
    <Popup
      trigger={<span className="text-blue-400 cursor-pointer">View</span>}
      modal
      closeOnDocumentClick={true}
    >
      {(close) => (
        <div className="bg-white w-max p-4 rounded-lg">
          <div className="flex justify-end">
            <div className="w-8 h-8 text-2xl rounded-full border-2 flex justify-center items-center overflow-hidden">
              <span
                onClick={() => {
                  close();
                }}
                className="cursor-pointer hover:text-white hover:bg-myblue-600 w-8 h-8 flex justify-center items-center duration-300"
              >
                &times;
              </span>
            </div>
          </div>
          <div>
            <span className="text-2xl text-gray-400">Compatible Cars</span>
          </div>
          <div className="flex flex-col">
            {props.data.map((data, index) => {
              return (
                <div className=" p-2">
                  {index + 1},{data.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Popup>
  );
}
