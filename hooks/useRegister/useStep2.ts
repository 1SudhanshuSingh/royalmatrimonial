import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Step2Formfill = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 2 form");
  }
};

export const useStep2Register = () => {
  const registerUserMutation = useMutation((value: any) =>
    Step2Formfill(value)
  );

  const Step2Query = () => {
    const { data, isLoading, error } = useQuery("step2", () => Step2Formfill);

    return { data, isLoading, error };
  };

  return {
    ...registerUserMutation,
    ...Step2Query(),
    Step2Formfill: (values: any) =>
      new Promise((resolve, reject) => {
        Step2Formfill(values)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      }),
  };
};