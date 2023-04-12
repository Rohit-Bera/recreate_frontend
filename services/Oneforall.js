// business logic
import axios from "axios";

const host = "https://recreate-backend-server.onrender.com";

const line = () => {
  return console.log(
    "---------------------------------------------------------------------"
  );
};

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

export const getAllServicesApi = async () => {
  try {
    const url = "/getAllservices";
    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const newlyService = [];

    const theData = response.data.allServices;
    // console.log("theData: ", theData);

    theData.map((item) => {
      console.log("------------------------------------------------");
      console.log("item the data: ", item);
      if (!item.service) {
        console.log("service not found");
        console.log("item launched service :", item.launchedService);
        newlyService.push(item);
      }
    });

    // console.log("newlyService: ", newlyService);

    return { newlyService };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// exceptional
export const getServicesForClickedApi = async () => {
  try {
    const url = "/getAllservices";
    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const newlyService = [];

    const theData = response.data.allServices;
    // console.log("theData: ", theData);

    theData.map((item) => {
      // console.log("item: ", item);
      if (!item.service) {
        console.log("service not found");
        console.log("item launched service :", item.launchedService);
        newlyService.push(item);
      }
    });

    // console.log("newlyService: ", newlyService);

    return { theData };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getSearchServiceApi = async ({ searchService }) => {
  console.log("searchService: ", searchService);
  try {
    const url = `/getSearchService/${searchService}`;

    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const { isFoundLaunchedService, isFoundService } = response.data;
    // console.log("isFoundLaunchedService: ", isFoundLaunchedService);
    // console.log("isFoundService: ", isFoundService);

    return { isFoundLaunchedService, isFoundService };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getServiceCatgeory = async ({ serviceName }) => {
  try {
    const url = `/getSearchService/${serviceName}`;
    const link = host + url;
    const response = await axios.get(link);
    console.log("response: ", response);
    // console.log("carpenters: ", response.data.isFoundService);
    const { isFoundService } = response.data;

    return { isFoundService };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const getAllUsersOrder = async ({ headers }) => {
  try {
    const url = "/getMyOrders";
    const link = host + url;

    const response = await axios.get(link, headers);

    const { error } = response.data;

    if (error) {
      return { error };
    }

    const { orders } = response.data;

    return { orders };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const bookService = async ({
  headers,
  serviceId,
  request,
  serviceName,
}) => {
  try {
    const url = "/bookService";
    const link = host + url;

    if (serviceId) {
      const data = { service: serviceId };

      const response = await axios.post(link, data, headers);

      console.log("response.data: ", response.data);

      const { newBookedService, error } = response.data;

      if (error) {
        return { error };
      }

      return { newBookedService };
    } else if (request) {
      const data = { request, serviceName };

      const response = await axios.post(link, data, headers);

      const { newBookedService, error } = response.data;

      if (error) {
        return { error };
      }

      return { newBookedService };
    }
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const deleteMyOrderService = async ({ _id, headers }) => {
  try {
    const url = `/deleteMyOrder/${_id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);
    console.log("response.data: ", response.data);

    const { success, error } = response.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};
