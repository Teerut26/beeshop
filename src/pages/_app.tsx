import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#EAB305",
        },
      }}
    >
      <Toaster />
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default api.withTRPC(MyApp);
