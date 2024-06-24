import { ChangeEvent, type FC, useState } from "react";
import { IEditTaskProps } from "./types.ts";
import { Button } from "../button";
import { DeleteIcon, EditIcon } from "../../../assets/icons";
import { Modal } from "../modal";
import { Input } from "../Input";

import cls from "./style.module.scss";
import { taskApi } from "../../../api/tasks.api.ts";
import toast from "react-hot-toast";

export const EditTaskField: FC<IEditTaskProps> = ({ value, ...props }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editTaskValue, setEditTaskValue] = useState<string>(value.title);
  const [deleteCategory] = taskApi.useDeleteTaskMutation();
  const [editTask] = taskApi.useEditCategoryMutation();

  const deleteItem = () => {
    deleteCategory(value._id)
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("deleted successfully.");
        setIsOpenDeleteModal(false);
      })
      .catch((err) => console.log(err));
  };

  const saveItem = () => {
    const body = { id: value._id, title: editTaskValue };
    editTask(body)
      .unwrap()
      .then((data) => {
        toast.success("modified successfully.");
        console.log(data);
        setIsOpenEditModal(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div {...props} className={cls.container}>
      {value.title}
      <div className={cls.buttons}>
        <Button
          buttonClass={cls.button}
          onClick={() => setIsOpenDeleteModal(true)}
        >
          <DeleteIcon height={14} width={14} title={"Delete"} />
        </Button>
        <Button
          buttonClass={cls.button}
          onClick={() => setIsOpenEditModal(true)}
        >
          <EditIcon height={14} width={14} title={"Edit"} />
        </Button>
      </div>

      <Modal
        open={isOpenDeleteModal}
        closeModal={() => setIsOpenDeleteModal(false)}
      >
        <div>Delete "{value.title}" category? </div>
        <div className={cls.modalButtons}>
          <Button onClick={() => setIsOpenDeleteModal(false)}>Cancel</Button>
          <Button onClick={deleteItem}>Delete</Button>
        </div>
      </Modal>

      <Modal
        open={isOpenEditModal}
        closeModal={() => setIsOpenEditModal(false)}
        title={"Edit task"}
      >
        <Input
          value={editTaskValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditTaskValue(e.target.value)
          }
        />
        <div className={cls.modalButtons}>
          <Button onClick={() => setIsOpenEditModal(false)}>Cancel</Button>
          <Button onClick={saveItem}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};
