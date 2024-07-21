export type Group = {
  instructor: string;
  max_students: number;
  name: string;
  status: string;
  students: string[];
  _id: string;
};

export type FormValues = {
  name: string;
  students: string[];
};

export type student = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
};
