import { Button } from "@janbox/ds";
import { TFormData } from "../App";

const Navbar = ({
  setIsShowShelfForm,
  setIsUpdateForm,
  setFormData,
  setIsShowAddBinForm,
}: {
  setIsShowShelfForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<TFormData | null>>;
  setIsShowAddBinForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCreateNewForm = () => {
    setIsShowShelfForm(false); // unmount form
    setIsShowAddBinForm(false);
    setIsUpdateForm(false);
    setFormData(null);
    setTimeout(() => {
      setIsShowShelfForm(true); // mount lại form sau khi đã unmount
    }, 0); // đảm bảo react render lại
  };
  return (
    <div className="flex justify-between items-center border bg-ic-white-6s px-5 py-2">
      <p className="text-base font-medium">Warehouse Layout</p>
      <Button color="primary" variant="outlined" onClick={handleCreateNewForm}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C8.55228 0 9 0.565535 9 1.26316V14.7368C9 15.4345 8.55228 16 8 16C7.44772 16 7 15.4345 7 14.7368V1.26316C7 0.565535 7.44772 0 8 0Z"
              fill="#1D39C4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 7.5C0 6.94772 0.565535 6.5 1.26316 6.5H14.7368C15.4345 6.5 16 6.94772 16 7.5C16 8.05228 15.4345 8.5 14.7368 8.5H1.26316C0.565535 8.5 0 8.05228 0 7.5Z"
              fill="#1D39C4"
            />
          </svg>
        </span>
        Create Shelf
      </Button>
    </div>
  );
};

export default Navbar;
