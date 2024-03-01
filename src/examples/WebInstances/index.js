import CachedIcon from "@mui/icons-material/Cached";
import Grid from "@mui/material/Grid";
import { WebInstanceService } from "services/api/orangeApi/endpoints/WebInstanceService";
import { handleErrorResponse } from "utils/handleResponses";

import { useEffect, useState } from "react";
import { useQueries } from "react-query";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const WebInstancesInfo = () => {
  const [timeoutIntervalId, setTimeoutIntervalId] = useState();
  const queries = useQueries([
    {
      queryFn: () => {
        return WebInstanceService.amountInfo();
      },
      queryKey: `web-instance-amount0-info`,
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter os dados das instâncias",
          e.response?.data
        );
      },
      onSuccess: (data) => {
        if (timeoutIntervalId) {
          clearInterval(timeoutIntervalId);
        }
        const timeoutId = setInterval(() => refetchWebInfo(), 15000);
        setTimeoutIntervalId(timeoutId);
      },
    },
  ]);

  const {
    isLoading: isLoadingWebInfo,
    data: webInfo,
    refetch: refetchWebInfo,
  } = queries[0];

  useEffect(() => {
    return () => {
      if (timeoutIntervalId) {
        clearInterval(timeoutIntervalId);
      }
    };
  }, []);

  return (
    <>
      <SoftBox pt={1} mb={0.5} textAlign="end">
        <SoftTypography
          color="text"
          fontSize="14px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          gap="4px"
        >
          <CachedIcon /> <span>Última atualização à 5 horas atrás</span>
        </SoftTypography>
      </SoftBox>
      {webInfo && (
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total de instâncias web" }}
                count={webInfo?.total || "0"}
                description={{
                  color: "secondary",
                  text: "O total de instâncias web executando",
                }}
                icon={{ color: "info", component: "storage" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Instâncias web conectadas" }}
                count={webInfo?.connected || "0"}
                description={{
                  color: "secondary",
                  text: "Total de instâncias web conectadas",
                }}
                icon={{ color: "success", component: "check_circle" }}
                type={"connecting"}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Instâncias web desconectadas" }}
                count={webInfo?.disconnected || "0"}
                description={{
                  color: "secondary",
                  text: "Total de instâncias web desconectadas",
                }}
                icon={{ color: "error", component: "power_settings_new" }}
                type={"close"}
              />
            </Grid>
          </Grid>
        </SoftBox>
      )}
    </>
  );
};

export default WebInstancesInfo;
