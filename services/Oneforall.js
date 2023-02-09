// business logic
import axios from "axios";

const host = "https://recreate-backend-server.onrender.com";

export const loginServices = async (data) => {
  console.log("data: ", data);
  const url = "/login";
  const link = host + url;

  try {
    const result = await axios.post(link, data);
    console.log("result: ", result.data);
    if (result.data.logUser) {
      const response = result.data.logUser;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const userSignUpServices = async (data) => {
  console.log("data: ", data);

  try {
    const url = "/signupUser";
    const link = host + url;

    const result = await axios.post(link, data);
    console.log("result.data.error: ", result.data);
    if (!result.data.error) {
      const response = result.data;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const workerSignupServices = async (data) => {
  console.log("data: ", data);
  try {
    const url = "/signupWorker";
    const link = host + url;

    const result = await axios.post(link, data);
    console.log("result: ", result.data);
    if (!result.data.error) {
      const response = result.data;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};
