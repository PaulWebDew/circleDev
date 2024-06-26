import { ChangeEvent, type FC, useState } from "react";
import { useParams } from "react-router-dom";
import { taskApi } from "../../api/tasks.api.ts";
import { Button } from "../../components/ui/button";
import { AddCategory } from "../../assets/icons";
import { Modal } from "../../components/ui/modal";
import { Input } from "../../components/ui/Input";
import { ITask } from "../../api/types.ts";

import cls from "./style.module.scss";
import { EditTaskField } from "../../components/ui/editTaskField";
import { categoryApi } from "../../api/categories.api.ts";
import { useModalTimer } from "../../hooks/modalTimer.ts";
import clsx from "clsx";

export const CategoriesPage: FC = () => {
  const params = useParams();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const [createTask] = taskApi.useCreateTaskMutation();
  const id = params.id;
  const { data: tasks } = taskApi.useGetTasksQuery(id);
  const { data: category } = categoryApi.useGetOneCategoryQuery(id);

  const { isActive, start } = useModalTimer(1000);

  const createTaskFetch = () => {
    id &&
      createTask({ categoryId: id, title: taskValue })
        .unwrap()
        .then((data) => {
          console.log(data);
          start();
          setIsOpenCreateModal(false);
        })
        .catch((err) => console.log(err));
  };

  const openModal = () => {
    setTaskValue("");
    setIsOpenCreateModal(true);
  };
  return (
    <section className={cls.container}>
      {category && <h1>{category.title}</h1>}
      <div className={cls.content}>
        <ul>
          {tasks?.map((task: ITask) => (
            <li key={task._id}>
              <EditTaskField value={task} />
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={openModal} buttonClass={cls.addCat}>
        Add Task <AddCategory color={"white"} width={20} height={20} />
      </Button>
      <Modal
        title={"Create Task"}
        open={isOpenCreateModal}
        closeModal={() => setIsOpenCreateModal(false)}
      >
        <Input
          value={taskValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskValue(e.target.value)
          }
        />
        <div className={cls.modalButtons}>
          <Button onClick={() => setIsOpenCreateModal(false)}>Cancel</Button>
          <Button onClick={createTaskFetch}>Save</Button>
        </div>
      </Modal>

      <div className={clsx(cls.modal, isActive && cls.modalActive)}>
        <h3>created successfully</h3>
      </div>
    </section>
  );
};
