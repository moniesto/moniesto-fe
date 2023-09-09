import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import api from "../../../services/api";
import { CurrencyBitcoinOutlined } from "@mui/icons-material";
import { WrappedTextField } from "../../../components/shared/common/wrappers/wrappedTextField";
import { roundNumber } from "./utils";

export type CurrencyType = {
  currency: string;
  price: number;
};

type CurrencyInputPropsType = {
  value: CurrencyType;
  market_type: string;
  onChange: (value: CurrencyType) => void;
  touched?: boolean;
  error?: string;
};

let timeoutId: NodeJS.Timeout;

export const CurrencyInput = memo(
  ({
    value,
    onChange,
    touched,
    error,
    market_type,
  }: CurrencyInputPropsType) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<CurrencyType[]>([]);
    const [searchValue, setSearchValue] = useState<string>();

    const setDefaultOptions = () => {
      setOpen(true);
      if (options.length) return;

      setLoading(true);
      api.crypto
        .search_currencies("usdt", market_type)
        .then((res) => setOptions(res))
        .finally(() => setLoading(false));
    };

    const handleCurrencySelect = (event: CurrencyType) => {
      onChange({
        ...event,
        price: Number(event?.price) || 0,
      });
      setOpen(false);
    };

    useEffect(() => {
      if (!searchValue) {
        setOpen(false);
        setOptions([]);
        return;
      }

      setLoading(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        api.crypto
          .search_currencies(searchValue, market_type)
          .then((res) => setOptions(res))
          .finally(() => setLoading(false));
      }, 500);
    }, [searchValue, market_type]);

    useEffect(() => {
      console.log("value :", value);
      setSearchValue("");
    }, [value]);

    return (
      <Autocomplete
        value={value.currency ? value : null}
        open={open}
        onOpen={setDefaultOptions}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          option.currency === value.currency
        }
        getOptionLabel={(option) => option?.currency || ""}
        options={options}
        loading={loading}
        onChange={(_, event) => handleCurrencySelect(event!)}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Stack
              sx={{
                width: "100%",
              }}
              justifyContent="space-between"
              direction="row"
            >
              <Box>{option.currency}</Box>
              <Box>{roundNumber(option.price)}</Box>
            </Stack>
          </Box>
        )}
        renderInput={(params) => (
          <WrappedTextField
            {...params}
            name="crypto_currency"
            onChange={(e) => setSearchValue(e.target.value)}
            error={touched && Boolean(error)}
            helperText={touched && error}
            InputProps={{
              ...params.InputProps,

              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyBitcoinOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      sx={{ mr: 1 }}
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  <Typography variant="h4">
                    {roundNumber(value.price) || ""}
                  </Typography>

                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }
);
