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

export const CategoriesPage: FC = () => {
  const params = useParams();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const [createTask] = taskApi.useCreateTaskMutation({});
  const id = params.id;
  const { data: Tasks } = taskApi.useGetTasksQuery(id);
  const { data: Category } = categoryApi.useGetOneCategoryQuery(id);

  const createTaskFetch = () => {
    id &&
      createTask({ categoryId: id, title: taskValue })
        .unwrap()
        .then((data) => {
          console.log(data);
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
      {Category && <h1>{Category.title}</h1>}
      <div className={cls.content}>
        <ul>
          {Tasks?.map((task: ITask, index: number) => (
            <li key={index}>
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
    </section>
  );
};
