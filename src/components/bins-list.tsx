const BinsList = ({
  setIsShowAddBinForm,
  setIsShowShelfForm,
}: {
  setIsShowAddBinForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowShelfForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="px-5">
      <p className="font-medium text-base">Bins</p>
      <div className="w-full h-[1px] bg-[#CAC4D0] mt-2 mb-3"></div>
      <div
        className="flex items-center gap-2 text-ic-primary-6s font-medium 
               hover:bg-gray-200 hover:text-blue-700 
               rounded-md py-1 cursor-pointer transition-all duration-200"
        onClick={() => {
          setIsShowAddBinForm(true);
          setIsShowShelfForm(false);
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C8.55228 0 9 0.565535 9 1.26316V14.7368C9 15.4345 8.55228 16 8 16C7.44772 16 7 15.4345 7 14.7368V1.26316C7 0.565535 7.44772 0 8 0Z"
              fill="#1D39C4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 7.5C0 6.94772 0.565535 6.5 1.26316 6.5H14.7368C15.4345 6.5 16 6.94772 16 7.5C16 8.05228 15.4345 8.5 14.7368 8.5H1.26316C0.565535 8.5 0 8.05228 0 7.5Z"
              fill="#1D39C4"
            />
          </svg>
        </span>
        Add bin
      </div>
    </div>
  );
};

export default BinsList;
