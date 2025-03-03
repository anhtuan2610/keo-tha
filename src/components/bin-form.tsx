import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormHelperText,
  FormLabel,
  Input,
  InputNumber,
  SelectPortal,
} from "@janbox/ds";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TFormData, TFormType, TShelfNode } from "../App";
import { useEffect, useState } from "react";
import { generateId } from "../utils/helper";
import { isNil } from "lodash-es";

export type TBinFormData = Omit<TFormData, "zone" | "row">;

const schema = yup.object({
  location: yup.string().required(),
  shelf: yup.string().required(),
  level: yup.number().typeError("must is number").required(),
  index: yup
    .number()
    .transform((val) => (isNil(val) ? val : String(val).replaceAll(",", "")))
    .typeError("must is number")
    .required(),
  length: yup.number().typeError("must is number").required(),
  width: yup.number().typeError("must is number").required(),
  startX: yup.number().typeError("must is number").required(),
  startY: yup.number().typeError("must is number").required(),
});

// const InputNum = ({
//   onChange,
// }: {
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>, val?: number) => void;
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const parsedNum = parseFloat(e.target.value);

//     onChange?.(e, parsedNum);
//   };

//   return <input onChange={handleChange} />;
// };

const BinForm = ({
  formData,
  setFormData,
  nodes,
  setNodes,
  formTypes,
  setFormTypes,
  selectedNodeId,
}: {
  formData: TFormData | null;
  setFormData: React.Dispatch<React.SetStateAction<TFormData | null>>;
  nodes: TShelfNode[];
  setNodes: React.Dispatch<React.SetStateAction<TShelfNode[]>>;
  formTypes: TFormType;
  setFormTypes: React.Dispatch<React.SetStateAction<TFormType>>;
  selectedNodeId: string | null;
}) => {
  const [parentNode, setParentNode] = useState<TShelfNode>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: TBinFormData) => {
    if (formTypes == "updateBin") {
      handleUpdateBin(data);
    }
    if (formTypes == "createBin") {
      handleCreateNewBin(data);
    }
  };

  const handleUpdateBin = (data: TBinFormData) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id != selectedNodeId) {
        return node;
      }
      return {
        ...node,
        data: {
          ...node.data,
          index: data.index,
          location: data.location,
          shelfCode: data.shelfCode ?? "",
          label: data.location ?? "",
          level: data.level,
        },
        style: { zIndex: Number(data.level) },
        height: Number(data.length),
        width: Number(data.width),
        position: {
          x: Number(data.startX),
          y: Number(data.startY),
        },
      };
    });
    setNodes(updatedNodes);
    setFormTypes(""); // ...
  };

  const handleCreateNewBin = (data: TBinFormData) => {
    if (nodes && parentNode) {
      setNodes((prev) => [
        ...prev,
        {
          id: generateId(),
          data: {
            location: data.location,
            shelfCode: data.shelfCode ?? "",
            index: data.index,
            label: data.location ?? "",
            zone: parentNode.data.zone,
            row: parentNode.data.row,
            level: data.level,
            parentId: parentNode.id,
          },
          style: { zIndex: Number(data.level) },
          type: "resizableNode",
          position: { x: Number(data.startX), y: Number(data.startY) },
          width: Number(data.width),
          height: Number(data.length),
          parentId: parentNode.id,
          extent: "parent",
        },
      ]);
      setFormTypes(""); // ...
    }
  };

  useEffect(() => {
    if (selectedNodeId) {
      if (formTypes == "updateBin") {
        const childNode = nodes.find((node) => node.id === selectedNodeId); // *
        if (childNode) {
          setFormData((prev) => ({
            ...prev,
            location: childNode.data.location ?? "",
            shelfCode: childNode.data.shelfCode ?? "",
            level: childNode.data.level ?? 0,
            index: childNode.data.index ?? 0,
            parentId: childNode.data.parentId ?? "",
            zone: childNode.data.zone ?? "",
            row: childNode.data.row ?? 0,
            length: childNode.height ?? 0,
            width: childNode.width ?? 0,
            startX: childNode.position.x ?? 0,
            startY: childNode.position.y ?? 0,
          }));
        }

        if (childNode?.parentId) {
          const findParent = nodes.find(
            (node) => node.id === childNode.parentId
          );
          setParentNode(findParent);
        }
      }
      if (formTypes == "createBin") {
        const findParent = nodes.find((node) => node.id === selectedNodeId);
        setParentNode(findParent);
      }
    }
  }, [selectedNodeId, nodes]);

  useEffect(() => {
    if (formData) {
      setValue("location", formData.location ?? "");
      setValue("shelf", parentNode?.data.shelfCode ?? ""); // setValue("shelf", parentNode?.data.shelfCode ?? "");
      setValue("level", formData.level);
      setValue("index", formData.index ?? 0);
      setValue("length", formData.length);
      setValue("width", formData.width);
      setValue("startX", formData.startX);
      setValue("startY", formData.startY);
    }
  }, [formData]); // formData, parentNode

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="px-3 pt-5 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-base font-medium ">
            {formTypes == "createBin" ? "Create Bin" : "Update Bin"}
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
            <FormLabel required>Location</FormLabel>
            <Input
              id="location"
              placeholder="Hint Text"
              type="text"
              {...register("location")}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <FormLabel required>Shelf</FormLabel>
            <Controller
              name="shelf" // tên trường(field) trong form
              control={control} // nhận control của form
              render={({ field }) => (
                <SelectPortal
                  {...field} // kết nối SelectPortal với react-hook-form tương tự ...register // {...field} giúp truyền các thuộc tính value, onChange, onBlur, ref vào <select>, giúp React Hook Form kiểm soát nó.
                  id="shelf"
                  placeholder="Select an option"
                  options={nodes
                    .filter((node) => !node.extent)
                    .map((node) => ({
                      label: node.data.label,
                      left: <span>*</span>,
                      value: node.data.shelfCode,
                    }))}
                  onChange={(value) => {
                    // setValue("shelf", value);
                    field.onChange(value);
                    setValue(
                      "location",
                      `${value}-${getValues("level") ?? ""}-${
                        getValues("index") ?? ""
                      }`
                    );
                  }}
                />
              )}
            />
            {errors && (
              <FormHelperText error>{errors.shelf?.message}</FormHelperText>
            )}
          </div>
          <div className="space-y-2">
            <FormLabel required>Level</FormLabel>
            <Controller
              name="level"
              control={control}
              render={({ field }) => {
                return (
                  <SelectPortal
                    {...field}
                    id="level"
                    placeholder="Select an option"
                    options={Array(5)
                      .fill(null)
                      .map((_, index) => {
                        return {
                          label: index,
                          left: <span>*</span>,
                          value: index,
                        };
                      })}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue(
                        "location",
                        `${getValues("shelf")}-${value}-${
                          getValues("index") ?? ""
                        }`
                      );
                    }}
                  />
                );
              }}
            />
            {errors && (
              <FormHelperText error>{errors.level?.message}</FormHelperText>
            )}
          </div>
          <div className="space-y-2">
            <FormLabel required>Index</FormLabel>
            {/* <Controller
              name="index"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  id="index"
                  placeholder="Index"
                  onChange={(e) => {
                    console.log(e.target.value);
                    field.onChange(e.target.value);
                    setValue(
                      "location",
                      `${getValues("shelf")}-${getValues("level")}-${
                        e.target.value
                      }`
                    );
                  }}
                />
              )}
            /> */}
            <InputNumber
              {...register("index")}
              id="index"
              value={watch("index")}
              placeholder="Hint Text"
              onChange={(_e, val) => {
                // nếu mà sử dụng event thì input nó không nhận được (trường hợp nhập nhiều số) vì có dấu "," nếu sử dụng val thì nó có cho phép điền cả dấu , sau đó mình phải tự validate và parse
                setValue(
                  "location",
                  `${getValues("shelf")}-${getValues("level")}-${val}`
                );
                setValue("index", val!);
              }}
            />
            {errors && (
              <FormHelperText error>{errors.index?.message}</FormHelperText>
            )}
          </div>
          <div className="space-y-2">
            <FormLabel required>Dimensions </FormLabel>
            <div className="flex justify-between gap-3">
              <div className="space-y-2 w-full">
                <InputNumber
                  {...register}
                  id="length"
                  value={watch("length")}
                  placeholder="Length"
                  onChange={(_e, val) => {
                    setValue("length", val!);
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
                  {...register}
                  id="width"
                  value={watch("width")}
                  placeholder="Width"
                  onChange={(_e, val) => {
                    setValue("width", val!);
                  }}
                />
                {errors && (
                  <FormHelperText error>{errors.width?.message}</FormHelperText>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <FormLabel required>Positions </FormLabel>
            <div className="flex justify-between gap-3">
              <div className="space-y-2 w-full">
                <InputNumber
                  {...register}
                  id="startX"
                  value={watch("startX")}
                  placeholder="start X"
                  onChange={(_e, val) => {
                    setValue("startX", val!);
                  }}
                />
                {errors && (
                  <FormHelperText error>
                    {errors.startX?.message}
                  </FormHelperText>
                )}
              </div>
              <div className="space-y-2 w-full">
                <InputNumber
                  {...register}
                  id="startY"
                  value={watch("startY")}
                  placeholder="start Y"
                  onChange={(_e, val) => {
                    setValue("startY", val!);
                  }}
                />
                {errors && (
                  <FormHelperText error>
                    {errors.length?.message}
                  </FormHelperText>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BinForm;
