import { Stack } from "@mui/system";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {
  Button,
  Divider,
  List,
  ListItemAvatar,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { useState } from "react";
import { Card } from "../../../interfaces/card";
import { TestCard, TestCard2 } from "../../../services/tempDatas";
import CardItem from "../../../components/shared/common/cardItem";
import { BeMoniestReq } from "../../../interfaces/requests";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleBack: () => void;
};

const PaymentStep = ({ handleNext, handleBack }: propType) => {
  const theme = useTheme();
  const [cards, setCards] = useState<Card[]>([TestCard, TestCard2]);
  const [selectedCard, setSelectedCard] = useState<string>();

  return (
    <Stack spacing={4}>
      <Stack
        padding={1.5}
        sx={{
          background: theme.palette.secondary.light,
          borderRadius: "10px",
          cursor: "pointer",
        }}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Stack alignItems="center" flexDirection="row" columnGap={1}>
          <AddCardOutlinedIcon sx={{ fontSize: "1.2rem" }} />
          <Typography variant="h4">Add new card</Typography>
        </Stack>

        <ArrowForwardIosOutlinedIcon sx={{ fontSize: "1rem" }} />
      </Stack>

      <Divider></Divider>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <List
          sx={{
            width: "100%",
            ".MuiListItem-root": {
              border: "1px solid transparent",
              transition: "all 0.2s ease",
              "&:not(last-of-type)": {
                marginBottom: "16px",
              },
              "&.selected": {
                border:
                  "1px solid " + theme.palette.secondary.main + "!important",
              },
            },
          }}
        >
          {cards.map((card) => (
            <CardItem
              listItemAvatar={
                <ListItemAvatar>
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        transition: "all 0.2s ease",
                        ".MuiSvgIcon-root": {
                          transition: "all 0.2s ease",
                          color: theme.palette.secondary.main,
                        },
                      },
                    }}
                    disableRipple
                    checked={selectedCard === card.id}
                    value={card.id}
                    name="radio-buttons"
                  />
                </ListItemAvatar>
              }
              key={card.id}
              onClickCard={() => setSelectedCard(card.id)}
              card={card}
              selectedCardId={selectedCard}
            ></CardItem>
          ))}
        </List>
      </RadioGroup>

      <Stack alignItems="center">
        <Stack
          width="80%"
          flexDirection="row"
          mt={4}
          justifyContent="space-between"
        >
          <Button onClick={handleBack} color="secondary" variant="outlined">
            Back
          </Button>
          <Button
            onClick={() => handleNext({ card_id: "test_card_id" })}
            variant="contained"
            color="secondary"
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default PaymentStep;
