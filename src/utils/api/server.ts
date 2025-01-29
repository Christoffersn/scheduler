import { Poll, Vote, HttpResponse, Time } from "../../models/poll";


const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  }
  // Client-side
  return process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
}

const httpMethod = async (
  endpoint: string,
  requestOptions: RequestInit
): Promise<HttpResponse> => {
  const res = await fetch(endpoint, requestOptions);
  const { status } = res;
  const responseData = await res.json();
  return {
    data: responseData,
    statusCode: status,
  };
};

const getPoll = (
  pollID: string | string[] | null | undefined
): Promise<HttpResponse> => {
  const endpoint = `/api/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "GET",
  };
  return httpMethod(getBaseUrl() + endpoint, requestOptions);
};

const createPoll = (pollArgs: { poll: Poll }): Promise<HttpResponse> => {
  const { poll } = pollArgs;
  const endpoint = `/api/poll/create`;
  console.log(getBaseUrl() + endpoint);
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(poll),
  };
  return httpMethod(getBaseUrl() + endpoint, requestOptions);
};

const markTimes = (voteArgs: {
  newVote: Vote;
  pollID: string;
}): Promise<HttpResponse> => {
  const { newVote, pollID } = voteArgs;
  const endpoint = `/api/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "PUT",
    body: JSON.stringify(newVote),
  };
  return httpMethod(getBaseUrl() + endpoint, requestOptions);
};

const markFinalTime = (voteArgs: {
  finalTime: { finalTime: Time | undefined; open: boolean };
  pollID: string;
  secret: string;
}): Promise<HttpResponse> => {
  const { finalTime, pollID, secret } = voteArgs;
  const endpoint = `/api/poll/${pollID}/${secret}`;
  const requestOptions: RequestInit = {
    method: "PUT",
    body: JSON.stringify(finalTime),
  };
  return httpMethod(getBaseUrl() + endpoint, requestOptions);
};

const deletePoll = (deleteArgs: {
  pollID: string;
  secret: string;
}): Promise<HttpResponse> => {
  const { pollID, secret } = deleteArgs;
  const endpoint = `/api/poll/${pollID}/${secret}`;
  const requestOptions: RequestInit = {
    method: "DELETE",
  };
  return httpMethod(getBaseUrl() + endpoint, requestOptions);
};

export { getPoll, createPoll, markTimes, markFinalTime, deletePoll };
