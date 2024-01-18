/**
=========================================================
* Orange APi - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Orange APi examples
import TimelineItem from "examples/Timeline/TimelineItem";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function SendedMessages() {
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Mensagens enviadas
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography
            variant="button"
            color="text"
            fontWeight="regular"
            display="flex"
            alignItems="center"
            gap="2px"
          >
            <SoftTypography
              display="inline"
              variant="body2"
              verticalAlign="middle"
            >
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { info } }) => info.main,
                }}
              >
                keyboard_double_arrow_right
              </Icon>
            </SoftTypography>
            &nbsp;
            <div>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                78
              </SoftTypography>{" "}
              hoje
            </div>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="dark" icon="music_note" title="Áudios" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="error" icon="play_circle" title="Vídeos" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="primary" icon="circle" title="Botões" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem
            color="secondary"
            icon="perm_contact_calendar"
            title="Contatos"
          />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="info" icon="text_snippet" title="Documentos" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="success" icon="image" title="Images" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="dark" icon="link" title="Links" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="error" icon="room" title="Localizações" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="secondary" icon="tune" title="Opções" />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem
            color="warning"
            icon="emoji_emotions"
            title="Stickers"
          />
          32
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TimelineItem color="info" icon="font_download" title="Textos" />
          32
        </Box>
      </SoftBox>
    </Card>
  );
}

export default SendedMessages;
