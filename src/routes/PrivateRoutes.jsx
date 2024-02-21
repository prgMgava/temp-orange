import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";

import { useQueries } from "react-query";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const queries = useQueries([
    {
      queryFn: () => {
        return AuthService.me();
      },
      queryKey: "auth-me",
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter o usuário logado",
          e.response?.data
        );
      },
      onSettled: () => {},
    },
  ]);

  const { isFetched: isFetchedLogado, data } = queries[0];

  if (!isFetchedLogado) {
    return <></>;
  }

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
