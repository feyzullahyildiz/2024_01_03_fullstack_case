import { Button, Flex, Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../layout/AuthLayout";
import { FormItem } from "react-hook-form-antd";
import { useAppDispatch } from "../../redux/hooks";
import { actionStartSignup } from "../../redux/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationApi } from "../../hooks";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

const formSchema = z.object({
  name: z.string().min(4, "Name must contain at least 4 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

export const SignupPage = () => {
  const api = useNotificationApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = useCallback(
    async (data: FieldType) => {
      try {
        await dispatch(
          actionStartSignup({
            name: data.name!,
            email: data.email!,
            password: data.password!,
          })
        ).unwrap();
        navigate("/login");
        api.success({ message: "User Created" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        api.error({ message: error?.message });
      }
    },
    [dispatch, api, navigate]
  );
  return (
    <AuthLayout title="Signup Page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <FormItem control={control} name="name" label="Name">
          <Input />
        </FormItem>
        <FormItem control={control} name="email" label="Email">
          <Input />
        </FormItem>
        <FormItem control={control} name="password" label="Password">
          <Input.Password />
        </FormItem>
        <Flex justify="end" align="end" gap={8} vertical>
          <Link to="/login">Login Page</Link>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Flex>
      </Form>
    </AuthLayout>
  );
};
