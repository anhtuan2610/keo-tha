import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@janbox/ds";
import { TFormData, TFormType, TShelfNode } from "../App";

const Navbar = ({
  setFormData,
  setFormTypes,
  currentLevel,
  setCurrentLevel,
  nodes,
}: {
  setFormData: React.Dispatch<React.SetStateAction<TFormData | null>>;
  setFormTypes: React.Dispatch<React.SetStateAction<TFormType>>;
  currentLevel: number;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  nodes: TShelfNode[];
}) => {
  const handleCreateNewForm = () => {
    setFormData(null);
    setFormTypes("");
    setTimeout(() => {
      setFormTypes("createShelf");
    }, 0);
  };
  const highestNodeLevel = nodes.reduce((highestNode, currNode) => {
    return currNode.data.level > highestNode.data.level
      ? currNode
      : highestNode;
  }, nodes[0]);

  return (
    <div className="flex justify-between items-center border bg-ic-white-6s px-5 py-2">
      <p className="text-base font-medium">Warehouse Layout</p>
      <div className="flex items-center gap-4">
        <div>Level: {currentLevel}</div>
        <Menu>
          <MenuHandler>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M9.66699 9.00033L13.1383 5.52899C13.2637 5.40366 13.3337 5.23433 13.3337 5.05766V3.33366C13.3337 2.96566 13.035 2.66699 12.667 2.66699H3.33366C2.96566 2.66699 2.66699 2.96566 2.66699 3.33366V5.05766C2.66699 5.23433 2.73699 5.40433 2.86233 5.52899L6.33366 9.00033"
                stroke="#333333"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.33398 9V13.166C6.33398 13.708 6.84332 14.106 7.36932 13.9747L9.03598 13.558C9.40665 13.4653 9.66732 13.132 9.66732 12.7493V9"
                stroke="#333333"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuHandler>
          <MenuList>
            {highestNodeLevel?.data?.level &&
              Array(highestNodeLevel.data.level)
                .fill(null)
                .map((_, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setCurrentLevel(index + 1);
                      setFormTypes("");
                    }}
                  >
                    Level {index + 1}
                  </MenuItem>
                ))}
          </MenuList>
        </Menu>

        <Button
          color="primary"
          variant="outlined"
          onClick={handleCreateNewForm}
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
    </div>
  );
};

export default Navbar;
