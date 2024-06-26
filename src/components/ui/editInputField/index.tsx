import { ChangeEvent, type FC, useState } from "react";
import { IEditInputFieldProps } from "./types.ts";
import { Button } from "../button";
import { DeleteIcon, EditIcon } from "../../../assets/icons";
import { categoryApi } from "../../../api/categories.api.ts";

import cls from "./style.module.scss";
import { Modal } from "../modal";
import { Input } from "../Input";
import toast from "react-hot-toast";

export const EditInputField: FC<IEditInputFieldProps> = ({
  value,
  ...props
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editCategoryValue, setEditCategoryValue] = useState<string>(
    value.title,
  );
  const [deleteCategory] = categoryApi.useDeleteCategoryMutation();
  const [editCategory] = categoryApi.useEditCategoryMutation();

  const deleteItem = () => {
    deleteCategory(value._id)
      .unwrap()
      .then((data) => {
        console.log(data);
        setIsOpenDeleteModal(false);
        toast.success("deleted successfully.");
      })
      .catch((err) => {
        toast.error(err.message || "An error occurred.");
        console.log(err);
      });
  };

  const saveItem = async () => {
    const body = {
      id: value._id,
      title: editCategoryValue,
    };

    editCategory(body)
      .unwrap()
      .then((data) => {
        console.log("data");
        toast("Edited successfully.");
        console.log(data);
        setIsOpenEditModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred.");
      });
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
        title={"Edit category"}
      >
        <Input
          value={editCategoryValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditCategoryValue(e.target.value)
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
