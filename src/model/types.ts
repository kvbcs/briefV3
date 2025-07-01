export type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export type Lists = {
  id: number;
  name: string;
  personAmount: number;
  tirageAmount: number;
  userId: number;
};