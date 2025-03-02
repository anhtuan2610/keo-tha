import { useState } from "react";
import GridTable from "./components/grid-table";
import Navbar from "./components/navbar";
import ShelfForm from "./components/shelf-form";
import { Node } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import BinsList from "./components/bins-list";
import BinForm from "./components/bin-form";

export type TFormType =
  | "createShelf"
  | "updateShelf"
  | "createBin"
  | "updateBin"
  | "";

export type TShelfNode = Node<{
  shelfCode?: string;
  label: string;
  zone: string;
  row: number;
  level: number;
  location?: string;
  index?: number;
  // nodesChildId: string[];
}>;

export type TFormData = {
  shelfCode?: string;
  location?: string;
  index?: number;
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
    data: {
      label: "A-1",
      zone: "A",
      row: 1,
      level: 1,
      shelfCode: "A-1",
      // nodesChildId: [],
    },
    position: { x: 0, y: 0 },
    width: 300,
    height: 300,
    style: { zIndex: 1 },
  },
  {
    id: "2",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      label: "A-2",
      zone: "A",
      row: 2,
      level: 2,
      shelfCode: "A-2",
      // nodesChildId: [],
    },
    position: { x: 100, y: 100 },
    width: 60,
    height: 150,
    style: { zIndex: 2 },
  },
  {
    // label là data trong cái hình ấy
    id: "3",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      location: "A-1-1-1",
      label: "A-1-1-1",
      zone: "A",
      row: 1,
      level: 1,
    },
    position: { x: 0, y: 0 },
    width: 150,
    height: 40,
    style: { zIndex: 1 },
    parentId: "1",
    extent: "parent",
  },
  {
    // label là data trong cái hình ấy
    id: "4",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      location: "A-1-1-1",
      label: "A-1-1-1",
      zone: "A",
      row: 1,
      level: 1,
    },
    position: { x: 0, y: 0 },
    width: 150,
    height: 40,
    style: { zIndex: 1 },
    parentId: "1",
    extent: "parent",
  },
];

function App() {
  const [nodes, setNodes] = useState<TShelfNode[]>(initialNodes);
  const [formData, setFormData] = useState<TFormData | null>(null);
  const [selectedShelfId, setSelectedShelfId] = useState<string | null>(null);
  const [formTypes, setFormTypes] = useState<TFormType>("");
  return (
    <div className="flex justify-center">
      <div className="flex gap-1 w-full min-h-screen">
        <div
          className={twMerge(
            clsx("flex flex-col min-w-[70%]", formTypes == "" && "w-full")
          )}
        >
          <Navbar setFormData={setFormData} setFormTypes={setFormTypes} />
          <GridTable
            setFormData={setFormData}
            setFormTypes={setFormTypes}
            setSelectedShelfId={setSelectedShelfId}
            nodes={nodes}
            setNodes={setNodes}
          />
        </div>
        {formTypes && (
          <div className="w-[30%] h-full border bg-ic-white-6s space-y-3">
            {["createShelf", "updateShelf"].includes(formTypes) && (
              <ShelfForm
                formData={formData}
                setFormData={setFormData}
                formTypes={formTypes}
                setFormTypes={setFormTypes}
                selectedShelfId={selectedShelfId}
                nodes={nodes}
                setNodes={setNodes}
              />
            )}

            {formTypes == "updateShelf" && (
              <BinsList
                setFormTypes={setFormTypes}
                nodes={nodes}
                selectedShelfId={selectedShelfId}
                setSelectedShelfId={setSelectedShelfId}
              />
            )}

            {(formTypes == "createBin" || formTypes == "updateBin") && (
              <BinForm
                setFormTypes={setFormTypes}
                nodes={nodes}
                formTypes={formTypes}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
