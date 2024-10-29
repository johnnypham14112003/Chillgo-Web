//Library
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

//Components
import { Header, Footer } from "../components/page layouts/Header_Footer";

//=============================================================================================
const Pricing_Page = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    //assign default value
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });
  const navigate = useNavigate();

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

  const handlePayment = () => {
    navigate("/authentication")
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        alert(`download started successfully!`);
      } else {
        alert(`Failed to start download. Please try again.`);
      }
    }, 2000);
  };

  // ----------------------------------------------------------------
  return (
    <div>
      <Header currentThemeMode={isDarkMode} onThemeChange={handleThemeChange} />

      <div
        className="py-24 sm:py-32"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--primary-text-color)" }}
            >
              Trải nghiệm tính năng độc quyền
            </h2>
            <p
              className="mt-6 text-lg leading-8"
              style={{ color: "var(--primary-text-color)" }}
            >
              Chúng tôi cung cấp gói dịch vụ phù hợp với nhu cầu của mọi khách
              hàng, từ những người thích khám phá độc lập đến những người cần
              trợ giúp toàn diện để có một chuyến du lịch hoàn hảo.
            </p>
          </div>
          <div
            className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary-text-color)" }}
              >
                Gói Tiêu Chuẩn
              </h3>
              <p
                className="mt-6 text-base leading-7"
                style={{ color: "var(--primary-text-color)" }}
              >
                Dành cho du khách muốn trải nghiệm tính năng đặc biệt của ứng
                dụng chúng tôi.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4
                  className="flex-none text-sm font-semibold leading-6"
                  style={{ color: "var(--primary-button-color)" }}
                >
                  Tính năng bao gồm
                </h4>
                <div
                  className="h-px flex-auto"
                  style={{ backgroundColor: "var(--background-color)" }}
                />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
                style={{ color: "var(--primary-text-color)" }}
              >
                <li className="flex gap-x-3">Trò chuyện không giới hạn với AI</li>
                <li className="flex gap-x-3">Đề xuất hoạt động cá nhân hóa</li>
                <li className="flex gap-x-3">
                  Ưu tiên hỗ trợ từ đội ngũ chăm sóc khách hàng
                </li>
                <li className="flex gap-x-3">Ưu đãi giảm giá bất ngờ</li>
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl py-10 text-center ring-1 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16"
              style={{ backgroundColor: "var(--secondary-text-color)" }}>
                <div className="mx-auto max-w-xs px-8">
                  <p
                    className="text-base font-semibold"
                    style={{ color: "var(--primary-text-color)" }}
                  >
                    Trả hàng tháng
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2" style={{ color: "var(--primary-text-color)" }}>
                    <span className="text-5xl font-bold tracking-tight">
                      20.000
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide">
                      VNĐ
                    </span>
                  </p>
                  <a
                    onClick={handlePayment}
                    className="mt-10 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      color: "var(--secondary-text-color)",
                      backgroundColor: "var(--primary-button-color)",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Mua ngay
                  </a>
                  <p
                    className="mt-6 text-xs leading-5"
                    style={{ color: "var(--primary-text-color)" }}
                  >
                    Thanh toán bằng chuyển khoản nên lịch sử giao dịch sẽ được
                    lưu trên ứng dụng và tài khoản ngân hàng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer currentThemeMode={isDarkMode} />
    </div>
  );
};

export default Pricing_Page;
