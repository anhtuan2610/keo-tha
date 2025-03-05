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
import { useEffect } from "react";
import { generateId, transformNumber } from "../utils/helper";
import { TFormData, TFormType, TShelfNode } from "../App";

const validate = yup.object({
  shelfCode: yup.string().required(),
  zone: yup.string().typeError("must is character a-z").required(),
  row: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
  level: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
  length: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
  width: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
  startX: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
  startY: yup
    .number()
    .transform(transformNumber)
    .typeError("must is number")
    .required(),
});

const ShelfForm = ({
  formData,
  // setFormData,
  formTypes,
  setFormTypes,
  selectedNodeId,
  nodes,
  setNodes,
  setFilterNodes,
}: {
  formData: TFormData | null;
  formTypes: TFormType;
  setFormTypes: React.Dispatch<React.SetStateAction<TFormType>>;
  selectedNodeId: string | null;
  nodes: TShelfNode[];
  setNodes: React.Dispatch<React.SetStateAction<TShelfNode[]>>;
  setFilterNodes: React.Dispatch<React.SetStateAction<TShelfNode[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
    resetField,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validate),
  });

  // const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputId = e.target.id;
  //   const inputValue = e.target.value;

  //   setFormData(
  //     (prev) =>
  //       ({
  //         ...prev,
  //         [inputId]: inputValue ?? "", // Đảm bảo giá trị không undefined
  //       } as TFormData)
  //   ); // Ép kiểu để tránh lỗi TypeScript
  // };

  const handleOnSubmit = (data: TFormData) => {
    if (formTypes == "updateShelf") {
      handleUpdateShelf(data);
    }
    if (formTypes == "createShelf") {
      handleCreateNewShelf(data);
    }
  };

  const handleUpdateShelf = (data: TFormData) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id != selectedNodeId) {
        return node;
      }
      return {
        ...node,
        data: {
          ...node.data,
          label: data.shelfCode ?? "",
          shelfCode: data.shelfCode ?? "",
          zone: data.zone,
          row: data.row,
          level: data.level,
        },
        height: Number(data.length),
        width: Number(data.width),
        position: {
          x: Number(data.startX),
          y: Number(data.startY),
        },
        // style: { zIndex: Number(data.level) },
      };
    });
    setNodes(updatedNodes);
    // setFilterNodes(updatedNodes);
    setFormTypes(""); // ...
  };

  const handleCreateNewShelf = (data: TFormData) => {
    if (nodes) {
      setNodes((prev) => [
        ...prev,
        {
          id: generateId(),
          data: {
            shelfCode: data.shelfCode ?? "",
            label: data.shelfCode ?? "",
            zone: data.zone,
            row: data.row,
            level: data.level,
          },
          type: "resizableNode",
          position: { x: Number(data.startX), y: Number(data.startY) },
          width: Number(data.width),
          height: Number(data.length),
          // style: { zIndex: Number(data.level) },
        },
      ]);
      setFormTypes(""); // ...
    }
  };

  useEffect(() => {
    if (formData) {
      setValue("shelfCode", formData.shelfCode ?? "");
      setValue("zone", formData.zone);
      setValue("row", formData.row);
      setValue("level", formData.level);
      setValue("length", formData.length);
      setValue("width", formData.width);
      setValue("startX", formData.startX);
      setValue("startY", formData.startY);
    }
  }, [formData]);

  // useEffect(() => {
  //   //reset(formData ?? {}); // Nếu formData là null thì reset về {}
  // }, [formData]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="px-3 pt-5 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-base font-medium ">
            {formTypes == "updateShelf" ? "Update Shelf" : "Create Shelf"}
          </p>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setFormTypes("")}
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
              type="text"
              {...register("shelfCode")}
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
                value={watch("zone")}
                type="text"
                onChange={(e) => {
                  setValue("zone", e.target.value);
                  setValue(
                    "shelfCode",
                    e.target.value + "-" + getValues("row").toString() // getValues chua co data ms nhat
                  );
                }}
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
                value={watch("row")}
                onChange={(_, value) => {
                  setValue("row", value!);
                  setValue(
                    "shelfCode",
                    getValues("zone") + "-" + value // getValues chua co data ms nhat
                  );
                }}
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
                value={watch("level")}
                onChange={(_, value) => {
                  setValue("level", value!);
                }}
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
                  value={watch("length")}
                  onChange={(_, value) => {
                    setValue("length", value!);
                  }}
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
                  value={watch("width")}
                  onChange={(_, value) => {
                    setValue("width", value!);
                  }}
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
                  value={watch("startX")}
                  onChange={(_, value) => {
                    setValue("startX", value!);
                  }}
                />
                {errors && (
                  <FormHelperText error>{errors.width?.message}</FormHelperText>
                )}
              </div>
              <div className="space-y-2 w-full">
                <InputNumber
                  id="startY"
                  placeholder="Start Y"
                  value={watch("startY")}
                  onChange={(_, value) => {
                    setValue("startY", value!);
                  }}
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
