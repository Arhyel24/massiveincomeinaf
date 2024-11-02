"use client";
import React from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function MyImageKitProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
