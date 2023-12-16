/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
    reactStrictMode: true,
    images: {
        domains: ["kurune-images-dev.s3.ap-northeast-1.amazonaws.com"],
    },
})
