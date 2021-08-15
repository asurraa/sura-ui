import { Card, CardProps, Divider, Typography } from "antd";
import { FC, Fragment, ReactNode } from "react";
import {
  AsurRaaImageViewer,
  AsurRaaImageViewerProvider,
} from "@asurraa/sura-ui-image-viewer";
import styled from "styled-components";
import { useGetAsurRaaSaleCard } from "./AsurRaaSaleCardProvider";

const Center = styled.div`
  display: flex;
  justify-content: center;
`;
export interface AsurRaaSaleCardProps {
  antdCardProps?: CardProps;
  imageValue: string | undefined;
  mainTitle: string | undefined | ReactNode;
  mainValueAtLeft: string | undefined | ReactNode;
  mainValueAtRight: string | undefined | ReactNode;
}

export const AsurRaaSaleCard: FC<AsurRaaSaleCardProps> = (props) => {
  const global = useGetAsurRaaSaleCard();
  return (
    <Fragment>
      <AsurRaaImageViewerProvider
        fallbackImage={global?.fallbackImage!}
        imageUrl={global?.imageUrl!}
      >
        <Card
          style={{
            boxShadow: "2px 2px 10px 2px rgba(208, 216, 243, 0.6)",
            cursor: "pointer",
          }}
          {...props.antdCardProps}
        >
          <Center>
            <AsurRaaImageViewer isPreview={false} value={props.imageValue} />
          </Center>
          <Divider />
          <Typography.Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {props?.mainTitle ?? ""}
          </Typography.Text>

          <div>
            <div style={{ paddingTop: 5 }}>
              <Typography.Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                {props?.mainValueAtLeft ?? ""}
              </Typography.Text>
            </div>
            <div style={{ marginTop: "8px" }}>
              <Typography.Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                {props?.mainValueAtRight ?? ""}
              </Typography.Text>
            </div>
          </div>
        </Card>
      </AsurRaaImageViewerProvider>
    </Fragment>
  );
};
