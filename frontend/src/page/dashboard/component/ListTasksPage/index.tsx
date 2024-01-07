import { useCallback, useEffect, useMemo } from "react";
import { Button, Flex, Popconfirm, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  actionDeleteTask,
  actionFetchTasks,
  actionUpdateStatusTask,
} from "../../../../redux/task/taskApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ColumnsType } from "antd/es/table";
import styles from "./style.module.css";
import { useNotificationApi } from "../../../../hooks";

const dateRenderFunction = (val: string) => {
  const date = new Date(val);
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  return `${YYYY}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSorterFunction = (key: string) => (a: any, b: any) => {
  return a[key] > b[key] ? 1 : -1;
};
export const ListTasksPage = () => {
  const api = useNotificationApi();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.task.isLoading);
  const tasks = useAppSelector((state) => state.task.tasks);
  useEffect(() => {
    dispatch(actionFetchTasks());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    await dispatch(actionFetchTasks()).unwrap();
  }, [dispatch]);

  const onDeleteConfirm = useCallback(
    async (id: string) => {
      try {
        await dispatch(actionDeleteTask({ id })).unwrap();
        await dispatch(actionFetchTasks()).unwrap();
        api.success({ message: "Task Deleted" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        api.error({ message: error?.message });
      }
    },
    [dispatch, api]
  );
  const onUpdateConfirm = useCallback(
    async (id: string, status: string) => {
      try {
        await dispatch(actionUpdateStatusTask({ id, status })).unwrap();
        await dispatch(actionFetchTasks()).unwrap();
        api.success({ message: "Task Updated" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        api.error({ message: error?.message });
      }
    },
    [dispatch, api]
  );

  const columns = useMemo(
    () =>
      [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          sorter: getSorterFunction("title"),
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          sorter: getSorterFunction("description"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: getSorterFunction("status"),
          onFilter: (value, record) => record.status === value,
          filters: [
            {
              text: "Pending",
              value: "pending",
            },
            {
              text: "Completed",
              value: "completed",
            },
          ],
          render: (status: string, { _id }) => {
            const nextStatusValue =
              status === "pending" ? "completed" : "pending";
            const okText =
              status === "pending" ? "Make it completed" : "Make it pending";
            const color = status === "pending" ? "green" : "magenta";
            return (
              <Popconfirm
                title="Change Status"
                description={() => (
                  <Flex vertical>
                    <span>Are you sure to update the task's status?</span>
                    <span>
                      Status will be from <strong>{status}</strong> to{" "}
                      <strong>{nextStatusValue}</strong>
                    </span>
                  </Flex>
                )}
                onConfirm={() => onUpdateConfirm(_id, nextStatusValue)}
                okText={okText}
              >
                <Tag style={{ cursor: "pointer" }} color={color}>
                  {status.toUpperCase()}
                </Tag>
              </Popconfirm>
            );
          },
        },
        {
          title: "DueDate",
          dataIndex: "dueDate",
          key: "dueDate",
          sorter: getSorterFunction("dueDate"),
          render: dateRenderFunction,
        },
        {
          title: "CreatedAt",
          dataIndex: "createdAt",
          key: "createdAt",
          sorter: getSorterFunction("createdAt"),
          render: dateRenderFunction,
        },
        {
          title: "UpdatedAt",
          dataIndex: "updatedAt",
          key: "updatedAt",
          sorter: getSorterFunction("updatedAt"),
          render: dateRenderFunction,
        },
        {
          title: "Action",
          render: (_, { _id }) => (
            <Popconfirm
              title="Delete"
              description="Are you sure to delete the task ?"
              onConfirm={() => onDeleteConfirm(_id)}
            >
              <Button size="small" type="default">
                Delete
              </Button>
            </Popconfirm>
          ),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as ColumnsType<any>,
    [onDeleteConfirm, onUpdateConfirm]
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Tasks</h3>
        <Flex gap={8}>
          <Button loading={isLoading} onClick={onRefresh}>
            Refresh
          </Button>
          <Link to="/add">
            <Button>Add Task</Button>
          </Link>
        </Flex>
      </div>
      <Table
        rowKey="_id"
        className={styles.table}
        dataSource={tasks}
        columns={columns}
      />
    </div>
  );
};
