import React from "react";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../layout/AuthLayout";
import { FormItem } from "react-hook-form-antd";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actionStartLogin } from "../../redux/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationApi } from "../../hooks";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginPage: React.FC = () => {
  const api = useNotificationApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FieldType) => {
    try {
      await dispatch(
        actionStartLogin({ email: data.email!, password: data.password! })
      ).unwrap();
      api.success({ message: "Logged in successfully" });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      api.error({ message: error?.message });
    }
  };
  const isLoading = useAppSelector((state) => state.auth.login.isLoading);
  return (
    <AuthLayout title="Login Page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <FormItem control={control} name="email" label="Email">
          <Input />
        </FormItem>
        <FormItem control={control} name="password" label="Password">
          <Input.Password />
        </FormItem>
        <Flex justify="end" align="end" gap={8} vertical>
          <Link to="/signup">Go Signup Page</Link>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Login
          </Button>
        </Flex>
      </Form>
    </AuthLayout>
  );
};
