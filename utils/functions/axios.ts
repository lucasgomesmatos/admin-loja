import axios, { AxiosError } from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    options: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    // const token = cookies().get('token')?.value;
    config.headers[
      'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiI2M2Y5ZWIyNS1lYTdmLTRhZmUtOTQ3Yy00NzkxOTcwNWIxZTgiLCJpYXQiOjE3MDk3NTc0MjIsImV4cCI6MTcxMDM2MjIyMn0.vXpf-KkYXkynw7bN9iFa9kiwm6K4XzrwxwizJKaTUYs`;
    return config;
  },
  (error: AxiosError) => {
    return error;
  },
);
