export type UpdateMyEditorialRequestDto = {
  content: string;
};

export type UpdateMyEditorialResponse = {
  message: string;
  editorialId: string;
};

export type DeleteMyEditorialResponse = {
  message: string;
};
