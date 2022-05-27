import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  ogType?: "website" | "article";
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
};

export const Head: React.FC<Props> = ({
  title,
  ogType = "website",
  ogDescription,
  ogImage = "https://ogimage.tsmallfield.com/img/ogp_1200x630.png",
  ogImageWidth = "1200",
  ogImageHeight = "630",
}) => {
  return (
    <Helmet>
      <title>{title} - ALGOSMO</title>
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content="アルゴズモ" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
    </Helmet>
  );
};
