  import axios from "axios";

export const getAllEmployee = async () => {
  const response = await axios.get(
    "https://nest-api-public.ixe-agent.io.vn/api/v1/employees/all",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwOCwicm9sZSI6IlF14bqjbiBsw70iLCJzdGF0dXMiOiJBQ1RJVkUiLCJkZXZpY2VJZCI6IjFmMDI1ZTk0LTM0YTAtNmVlMC05ZWE4LTMwYmIyMDQyMzJjZiIsImlhdCI6MTc2MDM0NTY5MCwiZXhwIjoxNzYwMzQ2NTkwfQ.HAEcIr1i1bsWELcaOBfCGu0nWr9jtSsAIOXS60Aw1F0",
      },
    }
  );

  return response.data;
};
