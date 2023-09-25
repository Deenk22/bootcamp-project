import {useMutation} from "@tanstack/react-query";
import AddOperationView from "./AddOperationFormView";
import axios from "axios";
import {IM_INVESTING_KEY} from "../../const/IM_investingKey";
import {operationFormFunction} from "../../const/operationFormFunction";
import {
  doneNotification,
  errorNotification,
} from "../../notifications/notification";

const url = "http://localhost:3000/operation";

export default function AddOperationForm() {
  const token = JSON.parse(localStorage.getItem(IM_INVESTING_KEY));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function onSubmit(values, actions) {
    postOperation(values);
    actions.resetForm();
  }

  const mutation = useMutation({
    mutationKey: ["newOperation"],
    mutationFn: async (values) => {
      return await axios.post(url, operationFormFunction(values), config);
    },

    onError: (err) => {
      if (err.response.status === 500) {
        const {message} = err.response.data;
        errorNotification(message);
      }
    },

    onSuccess: (data) => {
      return data;
    },
  });

  async function postOperation(values) {
    try {
      const {data, status} = await mutation.mutateAsync(values);
      if (status === 200) {
        const {message} = data;
        doneNotification(message);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  return <AddOperationView onSubmit={onSubmit} />;
}