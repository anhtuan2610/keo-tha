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
import { TShelfNode } from "../App";
import { useEffect, useState } from "react";

export type TBinFormData = {
  location: string;
  shelf: string;
  level: number;
  index: number;
  length: number;
  width: number;
  startX: number;
  startY: number;
};

type TLocationString = {
  shelf: string;
  level: number;
  index: number;
};

const schema = yup.object({
  location: yup.string().required(),
  shelf: yup.string().required(),
  level: yup.number().typeError("must is number").required(),
  index: yup.number().typeError("must is number").required(),
  length: yup.number().typeError("must is number").required(),
  width: yup.number().typeError("must is number").required(),
  startX: yup.number().typeError("must is number").required(),
  startY: yup.number().typeError("must is number").required(),
});

const BinForm = ({ nodes }: { nodes: TShelfNode[] }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [binFormData, setBinFormData] = useState<TBinFormData | null>(null);
  const [locationString, setLocationString] = useState<TLocationString>();

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBinFormData(
      (prev) =>
        ({
          ...prev,
          [e.target.id]: e.target.value,
        } as TBinFormData)
    );
  };

  useEffect(() => {
    reset(binFormData ?? {}); // Nếu formData là null thì reset về {}
  }, [binFormData]);

  // useEffect(() => {
  //   setLocationString((prev) => ({
  //     ...prev,
  //     index: binFormData?.index,
  //     level: binFormData?.level,
  //     shelf: binFormData?.shelf,
  //   }));
  // }, [binFormData]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="px-3 pt-5 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-base font-medium ">
            {true ? "Create Bin" : "Update Bin"}
          </p>
          <div className="flex gap-2">
            <Button color="primary" variant="outlined">
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
              value={"a"}
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
                  options={nodes.map((node) => {
                    return {
                      label: node.data.label,
                      left: <span>*</span>,
                      value: node.data.label,
                    };
                  })}
                  onChange={(value) => {
                    setBinFormData(
                      (prev) =>
                        ({
                          ...prev,
                          shelf: value,
                        } as TBinFormData)
                    );
                    return field.onChange(value);
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
                      setBinFormData(
                        (prev) =>
                          ({
                            ...prev,
                            level: value,
                          } as TBinFormData)
                      );
                      return field.onChange(value);
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
            <InputNumber
              id="index"
              placeholder="Hint Text"
              {...register("index")}
              value={binFormData?.index}
              onChange={handleOnChangeInput}
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
                  id="length"
                  placeholder="Length"
                  {...register("length")}
                  value={binFormData?.length}
                  onChange={handleOnChangeInput}
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
                  value={binFormData?.width}
                  onChange={handleOnChangeInput}
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
                  id="startX"
                  placeholder="Start X"
                  {...register("startX")}
                  value={binFormData?.startX}
                  onChange={handleOnChangeInput}
                />
                {errors && (
                  <FormHelperText error>
                    {errors.startX?.message}
                  </FormHelperText>
                )}
              </div>
              <div className="space-y-2 w-full">
                <InputNumber
                  id="startY"
                  placeholder="Start Y"
                  {...register("startY")}
                  value={binFormData?.startY}
                  onChange={handleOnChangeInput}
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
