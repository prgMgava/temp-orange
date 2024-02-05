import { AuthService } from "@/services/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";

import { useQueries } from "react-query";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const location = useLocation();

  const queries = useQueries([
    {
      queryFn: () => {
        return AuthService.obterUsuarioLogado();
      },
      queryKey: "usuario-logado",
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

  if (!data || (roles.length && !roles.find((_) => _ == data?.tipoUsuario))) {
    return <Navigate to="/404" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
