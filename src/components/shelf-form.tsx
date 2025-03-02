import {
  Button,
  FormHelperText,
  FormLabel,
  Input,
  InputNumber,
} from "@janbox/ds";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { generateId } from "../utils/helper";
import { TFormData, TShelfNode } from "../App";

const validate = yup.object({
  shelfCode: yup.string().required(),
  zone: yup.string().typeError("must is character a-z").required(),
  row: yup.number().typeError("must is number").required(),
  level: yup.number().typeError("must is number").required(),
  length: yup.number().typeError("must is number").required(),
  width: yup.number().typeError("must is number").required(),
  startX: yup.number().typeError("must is number").required(),
  startY: yup.number().typeError("must is number").required(),
});

const ShelfForm = ({
  formData,
  setFormData,
  isUpdateForm,
  setIsShowShelfForm,
  selectedShelfId,
  nodes,
  setNodes,
}: {
  formData: TFormData | null;
  setFormData: React.Dispatch<React.SetStateAction<TFormData | null>>;
  isUpdateForm: boolean;
  setIsShowShelfForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedShelfId: string | null;
  nodes: TShelfNode[];
  setNodes: React.Dispatch<React.SetStateAction<TShelfNode[]>>;
}) => {
  const [shelfCodeString, setShelfCodeString] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validate),
  });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    setFormData(
      (prev) =>
        ({
          ...prev,
          [inputId]: inputValue ?? "", // Đảm bảo giá trị không undefined
        } as TFormData)
    ); // Ép kiểu để tránh lỗi TypeScript

    // setShelfCodeString((prev) => {
    //   let [zone = "", row = ""] = prev.split("-"); // Đảm bảo có giá trị mặc định
    //   if (inputId === "zone") {
    //     zone = inputValue.trim();
    //   }
    //   if (inputId === "row") {
    //     row = inputValue.trim();
    //   }
    //   return `${zone}-${row}`; // Đảm bảo chuỗi hợp lệ
    // });
  };

  const handleOnSubmit = (data: TFormData) => {
    if (isUpdateForm) {
      handleUpdateShelf(data);
    } else {
      handleCreateNewShelf(data);
    }
  };

  const handleUpdateShelf = (data: TFormData) => {
    const updatedNodes = nodes.map((node) =>
      node.id !== selectedShelfId
        ? node
        : {
            ...node,
            data: {
              ...node.data,
              label: `${data.zone}-${data.row}`,
              shelfCode: `${data.zone}-${data.row}`,
              zone: data.zone,
              row: data.row,
              level: data.level,
            },
            style: { zIndex: Number(data.level) },
            height: Number(data.length),
            width: Number(data.width),
            position: { x: Number(data.startX), y: Number(data.startY) },
          }
    );

    setNodes(updatedNodes);
  };

  const handleCreateNewShelf = (data: TFormData) => {
    if (nodes) {
      setNodes((prev) => [
        ...prev,
        {
          id: generateId(),
          data: {
            label: data.shelfCode ?? "",
            zone: data.zone,
            row: data.row,
            level: data.level,
            shelfCode: shelfCodeString,
            nodesChildId: [],
          },
          style: { zIndex: Number(data.level) },
          type: "resizableNode",
          position: { x: Number(data.startX), y: Number(data.startY) },
          width: Number(data.width),
          height: Number(data.length),
        },
      ]);
      setIsShowShelfForm(false); // ...
    }
  };

  useEffect(() => {
    reset(formData ?? {}); // Nếu formData là null thì reset về {}
  }, [formData]);

  useEffect(() => {
    if (formData) {
      setShelfCodeString(`${formData.zone || ""}-${formData.row || ""}`);
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="px-3 pt-5 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-base font-medium ">
            {isUpdateForm ? "Update Shelf" : "Create Shelf"}
          </p>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setIsShowShelfForm(false)}
            >
              Cancel
            </Button>
            <Button color="primary" variant="filled" type="submit">
              Confirm
            </Button>
          </div>
        </div>
        <div className="px-3 py-2 space-y-3 border border-ic-ink-2s rounded-lg">
          <div className="space-y-2">
            <FormLabel required>Shelf Code </FormLabel>
            <Input
              id="shelfCode"
              placeholder="Hint Text"
              readOnly
              {...register("shelfCode")}
              onChange={handleOnChangeInput}
              value={shelfCodeString}
              type="text"
            />
            {errors && (
              <FormHelperText error>{errors.shelfCode?.message}</FormHelperText>
            )}
          </div>
          <div className="flex gap-3">
            <div className="space-y-2">
              <FormLabel required>Zone </FormLabel>
              <Input
                id="zone"
                placeholder="Zone"
                {...register("zone")}
                onChange={handleOnChangeInput}
                value={formData?.zone}
                type="text"
              />
              {errors && (
                <FormHelperText error>{errors.zone?.message}</FormHelperText>
              )}
            </div>
            <div className="space-y-2">
              <FormLabel required>Row </FormLabel>
              <InputNumber
                id="row"
                placeholder="Row"
                {...register("row")}
                onChange={handleOnChangeInput}
                value={formData?.row}
              />
              {errors && (
                <FormHelperText error>{errors.row?.message}</FormHelperText>
              )}
            </div>
            <div className="space-y-2">
              <FormLabel required>Level </FormLabel>
              <InputNumber
                id="level"
                placeholder="Level"
                {...register("level")}
                onChange={handleOnChangeInput}
                value={formData?.level}
              />
              {errors && (
                <FormHelperText error>{errors.level?.message}</FormHelperText>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <FormLabel required>Dimensions </FormLabel>
            <div className="flex justify-between gap-3">
              <div className="space-y-2 w-full">
                <InputNumber
                  id="length"
                  placeholder="Length"
                  {...register("length")}
                  onChange={handleOnChangeInput}
                  value={formData?.length}
                />
                {errors && (
                  <FormHelperText error>
                    {errors.length?.message}
                  </FormHelperText>
                )}
              </div>
              <div className="space-y-2 w-full">
                <InputNumber
                  id="width"
                  placeholder="Width"
                  {...register("width")}
                  onChange={handleOnChangeInput}
                  value={formData?.width}
                />
                {errors && (
                  <FormHelperText error>{errors.width?.message}</FormHelperText>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <FormLabel required>Cordinate </FormLabel>
            <div className="flex justify-between gap-3">
              <div className="space-y-2 w-full">
                <InputNumber
                  id="startX"
                  placeholder="Start X"
                  {...register("startX")}
                  onChange={handleOnChangeInput}
                  value={formData?.startX}
                />
                {errors && (
                  <FormHelperText error>{errors.width?.message}</FormHelperText>
                )}
              </div>
              <div className="space-y-2 w-full">
                <InputNumber
                  id="startY"
                  placeholder="Start Y"
                  {...register("startY")}
                  onChange={handleOnChangeInput}
                  value={formData?.startY}
                />
                {errors && (
                  <FormHelperText error>{errors.width?.message}</FormHelperText>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ShelfForm;
