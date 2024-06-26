import { ChangeEvent, type FC, useState } from "react";
import cls from "./style.module.scss";
import { Button } from "../ui/button";
import { AddCategory } from "../../assets/icons";

import { categoryApi } from "../../api/categories.api.ts";
import { ICategory } from "../../api/types.ts";
import { EditInputField } from "../ui/editInputField";
import { Modal } from "../ui/modal";
import { Input } from "../ui/Input";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useModalTimer } from "../../hooks/modalTimer.ts";

export const Sidebar: FC = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const { isActive, start } = useModalTimer(1000);

  const [createCategory] = categoryApi.useCreateCategoryMutation();
  const { data: categories } = categoryApi.useGetCategoriesQuery({});

  const openModal = () => {
    setCategoryValue("");
    setIsOpenCreateModal(true);
  };

  const createCategoryFetch = () => {
    createCategory({ title: categoryValue })
      .unwrap()
      .then((data) => {
        console.log(data);
        start();
        setIsOpenCreateModal(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className={cls.sidebar}>
      <h3>Category</h3>
      <ul className={cls.list}>
        {categories &&
          categories?.map((cat: ICategory) => (
            <>
              <NavLink
                to={`/category/${cat._id}`}
                className={({ isActive }) =>
                  clsx(cls.listItem, isActive && cls.activeCat)
                }
              >
                <EditInputField value={cat} />
              </NavLink>
            </>
          ))}
      </ul>
      <Button onClick={openModal} buttonClass={cls.addCat}>
        <div className={cls.buttonAdd}>
          Add Category <AddCategory color={"white"} width={20} height={20} />
        </div>
      </Button>
      <Modal
        open={isOpenCreateModal}
        closeModal={() => setIsOpenCreateModal(false)}
        title={"Create category"}
      >
        <Input
          autoFocus={true}
          value={categoryValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCategoryValue(e.target.value)
          }
        />
        <div className={cls.modalButtons}>
          <Button onClick={() => setIsOpenCreateModal(false)}>Cancel</Button>
          <Button onClick={createCategoryFetch}>Save</Button>
        </div>
      </Modal>
      <div className={clsx(cls.modal, isActive && cls.modalActive)}>
        <h3>created successfully</h3>
      </div>
    </section>
  );
};
