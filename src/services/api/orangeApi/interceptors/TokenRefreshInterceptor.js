import { AuthService } from "../endpoints/AuthService";

const SIGNOUT_API = "auth/refresh";

// A implementação do interceptor foi baseada nos exemplos abaixo:
// https://medium.com/@sina.alizadeh120/repeating-failed-requests-after-token-refresh-in-axios-interceptors-for-react-js-apps-50feb54ddcbc
// https://github.com/SinaMAlizadeh/axios-interceptors/blob/main/src/services/axsiox.ts
// https://www.bezkoder.com/axios-interceptors-refresh-token/
function applyAppTokenRefreshInterceptor(axiosClient) {
  function resolveInterceptor(response) {
    return response;
  }

  let refreshAndRetryQueue = [];

  // Flag para evitar múltiplas requisições de refresh de token.
  let isRefreshing = false;

  async function rejectInterceptor(error) {
    const status = error?.response?.status;
    const isUnauthorized = status === 401;

    const api = require("../orangeApi");

    const originalRequest = error?.config;

    if (error.response && isUnauthorized) {
      const url = originalRequest?.url ?? "";
      if (url.includes(SIGNOUT_API)) {
        // Esta checagem evita tentativas de refresh do token para quando a sessão já está expirada, o que impediria o usuário de efetuar logout.
        return;
      }
      debugger;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await AuthService.refreshToken();

          // Efetua tentativa de chamar todas as solicitações na fila com o novo access token.
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          refreshAndRetryQueue = [];

          return api;
        } catch (refreshError) {
          window.location.href = "/login";
        } finally {
          isRefreshing = false;
        }
      }

      // Adiciona a request na fila caso um erro 401 ocorra durante o processo de refresh do token.
      // Assim que houver um novo token, uma nova tentativa de chamar request será executada.
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // Se o status code não for 401, a Promise é rejeitada para evitar a propagação do erro.
    return Promise.reject(error);
  }

  return axiosClient.interceptors.response.use(
    resolveInterceptor,
    rejectInterceptor
  );
}

export default applyAppTokenRefreshInterceptor;
