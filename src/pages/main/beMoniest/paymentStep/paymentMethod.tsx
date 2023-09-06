import { Stack } from "@mui/system";
import { Divider, Tab, Tabs, Typography } from "@mui/material";

import { ReactNode, SyntheticEvent, useMemo, useState } from "react";
import { CreditCardOutlined, CurrencyBitcoin } from "@mui/icons-material";

import { PaymentBinanceTab } from "./paymentBinanceTab";
import Fly from "../../../../components/shared/common/fly/fly";
import { useTheme } from "@mui/system";
import { useTranslate } from "../../../../hooks/useTranslate";
import { sendAnalytic } from "../../../../services/analytic";

const tabs = [
  {
    order: 1,
    icon: <CurrencyBitcoin />,
    label: "binance",
    disabled: false,
  },
  {
    order: 2,
    icon: <CreditCardOutlined />,
    label: "bank",
    disabled: true,
  },
];

type PaymentStepPropType = {
  defaults: {
    binance_id?: string;
  };
  onChange: {
    binance: (value: string) => void;
  };
  footer: ReactNode;
};

const PaymentMethod = ({ defaults, onChange, footer }: PaymentStepPropType) => {
  sendAnalytic({ hitType: "pageview", page: "Payment Method" });
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const translate = useTranslate();

  const handleTabChange = (
    _: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setActiveTab(value);
  };

  const currentTabContent = useMemo(() => {
    let content;
    switch (activeTab) {
      case 0:
        content = (
          <PaymentBinanceTab
            onBinanceIdChange={(val) => onChange.binance(val)}
            default_binance_id={defaults.binance_id}
            footer={footer}
          />
        );
        break;
    }
    return content;
  }, [activeTab, defaults.binance_id, footer, onChange]);

  return (
    <Fly>
      <Stack spacing={4}>
        <Fly.Item>
          <Divider></Divider>
        </Fly.Item>
        <Fly.Item>
          <Typography variant="h4" sx={{ opacity: 0.8 }}>
            {translate("page.be_moniest.select_payout_method")}
          </Typography>
        </Fly.Item>
        <Fly.Item>
          <Tabs
            sx={{
              marginBottom: "20px !important",
              ".MuiTabs-indicator": {
                backgroundColor: theme.palette.text.primary,
              },
            }}
            variant="fullWidth"
            value={activeTab}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <Tab
                key={"payment_tab_" + tab.order}
                disabled={tab.disabled}
                icon={tab.icon}
                label={translate("page.be_moniest.payout_method." + tab.label)}
              />
            ))}
          </Tabs>
        </Fly.Item>

        {currentTabContent}
      </Stack>
    </Fly>
  );
};
export default PaymentMethod;
