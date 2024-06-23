export interface ICategory {
  _id: string;
  title: string;
}

export interface ICreateTaskBody {
  categoryId: string;
  title: string;
}

export interface ITask {
  category: string;
  createdAt: Date;
  title: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IEditData {
  id: string;
  title: string;
}
