//Library
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

//Assets
import IconExpandMore from "@mui/icons-material/ExpandMore";

//=============================================================================================
const FAQS_Page = () => {
  //---------------------[ Declare ]-----------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    "tab_1"
  );

  // ----------------------------------------------------------------
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme.toString());
  };

  // ----------------------------------------------------------------
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    border: `1px solid #EEA0FF`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const handleChangeTab =
    (panelName: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panelName : false);
    };

  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <Container component={"section"} maxWidth="lg" sx={{ my: "2em" }}>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--secondary-button-color)",
            px: "1em",
            py: "2em",
            borderRadius: "10px",
          }}
        >
          <Typography
            component="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: { xs: 20, md: 27, lg: 34 },
            }}
            gutterBottom
          >
            <b>Câu Hỏi Thường Gặp</b>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: 14, md: 17, lg: 20 },
            }}
          >
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 2,
                mr: "20px",
              }}
            >
              <Accordion
                defaultExpanded
                expanded={expandedAccordion === "tab_1"}
                onChange={handleChangeTab("tab_1")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Làm thế nào để cài đặt file APK của ứng dụng trên Android?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "var(--secondary-special-color)",
                  }}
                >
                  <Typography component="p" gutterBottom>
                    Để cài đặt file APK, bạn cần tải file APK về thiết bị
                    Android của mình. Sau đó, vào phần "Cài đặt" &gt; "Bảo mật"
                    &gt; cho phép cài đặt từ nguồn không xác định. Cuối cùng, mở
                    file APK đã tải và làm theo hướng dẫn trên màn hình.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_2"}
                onChange={handleChangeTab("tab_2")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng hỗ trợ du lịch thông minh này có những tính năng gì
                    nổi bật?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng sử dụng AI để gợi ý các địa điểm du lịch, nhà hàng,
                    khách sạn và các hoạt động giải trí dựa trên sở thích và
                    hành vi của bạn. Ngoài ra, nó còn có tính năng lập kế hoạch
                    tự động cho chuyến đi và cung cấp hướng dẫn thời gian thực.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_3"}
                onChange={handleChangeTab("tab_3")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có sử dụng ngoại tuyến không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Không, sau khi bạn đăng nhập lần đầu thì bạn chỉ có thể sử
                    dụng để xem kế hoạch mà bạn đã tạo mà không cần phải có kết
                    nối internet. Còn lại các tính năng khác cần phải có kết nối
                    internet
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_3"}
                onChange={handleChangeTab("tab_3")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có hỗ trợ tìm kiếm địa điểm ngoại tuyến không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Không, để có thể tìm kiếm địa điểm trên kho dữ liệu của
                    chúng tôi, bạn phải có kết nối internet và có tài khoản ứng
                    dụng để có thể sử dụng tính năng tìm kiếm địa điểm này.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_4"}
                onChange={handleChangeTab("tab_4")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Tôi có thể sử dụng ứng dụng mà không cần đăng ký tài khoản
                    không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Bạn chỉ có thể sử dụng một số tính năng cơ bản của ứng dụng
                    sau khi đăng ký tài khoản và đăng nhập vào ứng dụng.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_5"}
                onChange={handleChangeTab("tab_5")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có hỗ trợ nhiều ngôn ngữ không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Không, ứng dụng hiện tại chỉ đang phát hành sớm thử nghiệm
                    tập trung chủ yếu vào du lịch Việt Nam nên ngôn ngữ chủ yếu
                    sử dụng là Tiếng Việt.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_6"}
                onChange={handleChangeTab("tab_6")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có sẵn trên Google Play không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Hiện tại, ứng dụng có sẵn trên Google Play để tải về. Bạn
                    chỉ cần mở Google Play, tìm tên ứng dụng Chillgo và nhấn vào
                    nút "Cài đặt". Điều này sẽ đảm bảo bạn nhận được các bản cập
                    nhật và tính năng mới nhất.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_7"}
                onChange={handleChangeTab("tab_7")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Tôi có thể cài ứng dụng trên các phiên bản Android nào?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng hỗ trợ trên các thiết bị Android chạy phiên bản
                    Android 6.0 (Marshmallow) trở lên. Bạn nên kiểm tra phiên
                    bản hệ điều hành của thiết bị trước khi cài đặt.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_8"}
                onChange={handleChangeTab("tab_8")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Sau khi cài đặt, làm thế nào để bắt đầu sử dụng ứng dụng?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Sau khi cài đặt xong, hãy mở ứng dụng và tạo tài khoản (hoặc
                    đăng nhập nếu bạn đã có tài khoản). Ứng dụng sẽ cung cấp
                    hướng dẫn sử dụng cơ bản để bạn làm quen với các tính năng
                    chính như tìm kiếm địa điểm, lập kế hoạch du lịch, và gợi ý
                    cá nhân hóa từ AI. Hoặc nếu bạn không thấy hướng dẫn thì có
                    thể hỏi trực tiếp nhân viên chăm sóc khách hàng.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_9"}
                onChange={handleChangeTab("tab_9")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Làm thế nào để ứng dụng gợi ý được các địa điểm du lịch phù
                    hợp với tôi?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng sử dụng công nghệ AI để học hỏi từ lịch sử tìm kiếm
                    và sở thích của bạn. Bạn có thể cung cấp thông tin cá nhân
                    về sở thích như loại hình du lịch yêu thích, mức ngân sách
                    và các hoạt động mong muốn để ứng dụng đưa ra gợi ý chính
                    xác hơn.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_10"}
                onChange={handleChangeTab("tab_10")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có thu thập thông tin cá nhân của tôi không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng chỉ thu thập thông tin cần thiết để cá nhân hóa
                    trải nghiệm du lịch của bạn, chẳng hạn như địa điểm yêu
                    thích hoặc thói quen du lịch. Thông tin này được bảo mật và
                    không chia sẻ với bên thứ ba trừ khi có sự đồng ý của bạn.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_11"}
                onChange={handleChangeTab("tab_11")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có yêu cầu quyền truy cập nào trên điện thoại
                    không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng sẽ yêu cầu quyền truy cập vào vị trí của bạn để gợi
                    ý các địa điểm du lịch gần đó. Ngoài ra, có thể yêu cầu truy
                    cập vào bộ nhớ để lưu trữ kế hoạch ngoại tuyến. Tất cả các
                    quyền này đều cần sự chấp thuận của bạn trước khi kích hoạt.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_12"}
                onChange={handleChangeTab("tab_12")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Ứng dụng có an toàn để sử dụng không?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Ứng dụng được phát triển và kiểm tra kỹ lưỡng để đảm bảo an
                    toàn cho người dùng. Mọi thông tin cá nhân được mã hóa và
                    bảo mật. Ứng dụng không thu thập hay chia sẻ thông tin mà
                    không có sự cho phép của bạn.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_13"}
                onChange={handleChangeTab("tab_13")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Làm sao để cập nhật ứng dụng lên phiên bản mới nhất?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Nếu bạn đã tải ứng dụng từ Google Play, các bản cập nhật sẽ
                    được tự động tải về khi có kết nối Wi-Fi. Nếu bạn cài bằng
                    file APK, bạn cần kiểm tra trang web chính thức thường xuyên
                    để tải phiên bản mới nhất.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "tab_14"}
                onChange={handleChangeTab("tab_14")}
              >
                <AccordionSummary
                  expandIcon={
                    <IconExpandMore
                      sx={{ color: "var(--primary-button-color)" }}
                    />
                  }
                  sx={{ backgroundColor: "var(--background-color)" }}
                >
                  <Typography
                    component="h6"
                    sx={{
                      color: "var(--primary-button-color)",
                      fontSize: "inherit",
                    }}
                  >
                    Tôi có thể liên hệ với bộ phận hỗ trợ của ứng dụng bằng cách
                    nào?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--secondary-special-color)" }}
                >
                  <Typography component="p" gutterBottom>
                    Bạn có thể liên hệ với chúng tôi qua email hoặc số điện
                    thoại hỗ trợ được cung cấp trong phần "Liên hệ" của ứng
                    dụng. Ngoài ra, bạn có thể tham gia cộng đồng người dùng
                    trên các diễn đàn trực tuyến để nhận trợ giúp từ người dùng
                    khác trên trang web Chillgo.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Box>
        </Paper>
      </Container>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default FAQS_Page;
