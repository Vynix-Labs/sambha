import * as yup from "yup";

export const createGroupSchema = yup.object({
  groupName: yup.string().required("Group name is required"),
});

export type GroupType = yup.InferType<typeof createGroupSchema>
