import { useState } from "react";
import GridTable from "./components/grid-table";
import Navbar from "./components/navbar";
import ShelfForm from "./components/shelf-form";
import { Node } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import BinsList from "./components/bins-list";
import BinForm from "./components/bins-form";

export type TShelfNode = Node<{
  shelfCode: string;
  label: string;
  zone: string;
  row: number;
  level: number;
}>;

export type TFormData = {
  shelfCode?: string;
  zone: string;
  row: number;
  level: number;
  length: number;
  width: number;
  startX: number;
  startY: number;
};

const initialNodes: TShelfNode[] = [
  {
    // label là data trong cái hình ấy
    id: "1",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: { label: "A-1", zone: "A", row: 0, level: 1, shelfCode: "A-1" },
    position: { x: 0, y: 0 },
    width: 150,
    height: 40,
    style: { zIndex: 1 },
  },
  {
    id: "2",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: { label: "A-2", zone: "A", row: 2, level: 2, shelfCode: "A-2" },
    position: { x: 100, y: 100 },
    width: 60,
    height: 150,
    style: { zIndex: 2 },
  },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [formData, setFormData] = useState<TFormData | null>(null);
  const [isShowShelfForm, setIsShowShelfForm] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [selectedShelfId, setSelectedShelfId] = useState<string | null>(null);
  const [isShowAddBinForm, setIsShowAddBinForm] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="flex gap-1 w-full min-h-screen">
        <div
          className={twMerge(
            clsx("flex flex-col min-w-[70%]", !isShowShelfForm && "w-full")
          )}
        >
          <Navbar
            setIsShowShelfForm={setIsShowShelfForm}
            setIsUpdateForm={setIsUpdateForm}
            setFormData={setFormData}
            setIsShowAddBinForm={setIsShowAddBinForm}
          />
          <GridTable
            setFormData={setFormData}
            setSelectedShelfId={setSelectedShelfId}
            setIsUpdateForm={setIsUpdateForm}
            setIsShowShelfForm={setIsShowShelfForm}
            nodes={nodes}
            setNodes={setNodes}
          />
        </div>
        {isShowShelfForm && (
          <div className="w-[30%] h-full border bg-ic-white-6s space-y-3">
            <ShelfForm
              isUpdateForm={isUpdateForm}
              setIsShowShelfForm={setIsShowShelfForm}
              formData={formData}
              setFormData={setFormData}
              selectedShelfId={selectedShelfId}
              nodes={nodes}
              setNodes={setNodes}
            />
            {isUpdateForm && (
              <BinsList
                setIsShowAddBinForm={setIsShowAddBinForm}
                setIsShowShelfForm={setIsShowShelfForm}
              />
            )}
          </div>
        )}
        {isShowAddBinForm && (
          <div className="w-[30%] h-full border bg-ic-white-6s space-y-3">
            <BinForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
