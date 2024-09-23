export type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

export type ErrorObj = {
  message: string;
  statusCode: number;
};