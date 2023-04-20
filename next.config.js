/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "http://localhost:3000",

    STRIPE_PUBLIC_KEY: "pk_test_51MyPRRAVRzUMNM9Kapi2cfW5ZcwibtBYUQ8TZUMBmhnlKhagn8MuA31TwS5e0QztRp8scHdi6rcL8Kcon4rdPUsA0057QKX4fM",
    STRIPE_PRIVATE_KEY: "sk_test_51MyPRRAVRzUMNM9Kt1gRVnOgcMfQCjJozE9WN5fGHSC2VUk34IoQKF9PNv6HlorTdq9brrhkNmBK7y4PR5zDTga5002qKnYRRL"
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
