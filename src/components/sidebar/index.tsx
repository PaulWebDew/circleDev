import {ChangeEvent, type FC, useEffect, useState} from "react";
import cls from "./style.module.scss";
import {Button} from "../ui/button";
import {AddCategory} from "../../assets/icons";

import {categoryApi} from "../../api/categories.api.ts";
import {ICategory} from "../../api/types.ts";
import {EditInputField} from "../ui/editInputField";
import {Modal} from "../ui/modal";
import {Input} from "../ui/Input";
import clsx from "clsx";
import {useNavigate, useParams} from "react-router-dom";

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [createCategory] = categoryApi.useCreateCategoryMutation();
  const {data: Category} = categoryApi.useGetCategoriesQuery({});

  const openModal = () => {
    setCategoryValue("");
    setIsOpenCreateModal(true);
  };

  const createCategoryFetch = () => {
    createCategory({title: categoryValue})
      .unwrap()
      .then((data) => {
        console.log(data);
        setIsOpenCreateModal(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    params?.id && setActiveCategory(params.id);
  }, [params?.id]);
  return (
    <section className={cls.sidebar}>
      <h3>Category</h3>
      <ul className={cls.list}>
        {Category &&
          Category?.map((cat: ICategory, ind: number) => (
            <li
              key={ind}
              className={clsx(
                cls.listItem,
                activeCategory === cat._id && cls.activeCat,
              )}
              onClick={() => {
                setActiveCategory(cat._id);
                navigate(`/category/${cat._id}`);
              }}
            >
              <EditInputField value={cat}/>
            </li>
          ))}
      </ul>
      <Button onClick={openModal} buttonClass={cls.addCat}>
        <div className={cls.buttonAdd}>Add Category <AddCategory color={"white"} width={20} height={20}/></div>
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
    </section>
  );
};
