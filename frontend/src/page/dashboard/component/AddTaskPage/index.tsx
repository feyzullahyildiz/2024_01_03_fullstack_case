import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, DatePicker, Flex, Form, Input } from "antd";
import { FormItem } from "react-hook-form-antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./style.module.css";
import { useAppDispatch } from "../../../../redux/hooks";
import { actionCreateTask } from "../../../../redux/task/taskApi";
import { useNotificationApi } from "../../../../hooks";
const formSchema = z.object({
  title: z.string().min(4, "Name must contain at least 4 characters"),
  description: z
    .string()
    .min(1, "Description must contain at least 1 characters"),
  dueDate: z.instanceof(dayjs as unknown as typeof Dayjs),
});

type FieldType = {
  title?: string;
  description?: string;
  dueDate?: Dayjs;
};

export const AddTaskPage = () => {
  const navigate = useNavigate();
  const api = useNotificationApi();
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: dayjs(),
    },
  });

  const onSubmit = useCallback(
    async (data: FieldType) => {
      try {
        await dispatch(
          actionCreateTask({
            title: data.title!,
            description: data.description,
            dueDate: data.dueDate!.toDate(),
          })
        ).unwrap();
        api.success({ message: "Task Created" });
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        api.error({ message: error?.message });
      }
    },
    [dispatch, api, navigate]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Create Task</h3>
        <Link to="/">
          <Button shape="circle" icon={<CloseOutlined />} />
        </Link>
      </div>

      <Card title="Create Task">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit(onSubmit)}
        >
          <FormItem control={control} name="title" label="Title">
            <Input />
          </FormItem>
          <FormItem control={control} name="description" label="Description">
            <Input.TextArea />
          </FormItem>
          <FormItem control={control} name="dueDate" label="DueDate">
            <DatePicker
              className={styles.datepicker}
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </FormItem>

          <Flex justify="end" align="end" gap={8} vertical>
            <Button type="primary" htmlType="submit">
              Create Task
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};
