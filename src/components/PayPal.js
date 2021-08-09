import React, { useRef } from "react";
import PayPalButton from "./PayPalButton";
import { makeStyles, Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  p: {
    padding: "1rem",
  },
  email: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
});

function PayPal() {
  const [copied, setCopied] = React.useState(false);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <Typography variant="h6">Click here to pay</Typography>
        <ArrowDownwardIcon
          className="animate"
          color="primary"
          style={{ fontSize: "40px" }}
        />
        <PayPalButton />
        <div className={styles.info}>
          <p className={styles.p}>
            <Typography variant="h6">
              Please use the following credential to test the purchase: <br />{" "}
            </Typography>
            <div className={styles.email}>
              <Typography>
                {" "}
                <span
                  style={{
                    display: "inline-block",
                    borderBottom: "2px solid black",
                  }}
                >
                  Email:
                </span>{" "}
                sb-chtib7087265@personal.example.com
              </Typography>
              <CopyToClipboard text="  sb-chtib7087265@personal.example.com">
                <div className="copy-area">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setCopied(true)}
                    style={{ width: "50px", fontSize: "12px" }}
                  >
                    {copied ? "Copied " : "   Copy "}
                  </Button>
                </div>
              </CopyToClipboard>{" "}
            </div>
            <Typography>
              {" "}
              <span
                style={{
                  display: "inline-block",
                  borderBottom: "2px solid black",
                }}
              >
                {" "}
                Password:{" "}
              </span>
              123456789
            </Typography>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PayPal;
