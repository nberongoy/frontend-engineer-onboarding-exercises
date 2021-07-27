import * as yup from 'yup';

export const productForm = yup.object().shape({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
});
