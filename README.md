# nextjs-web3

NextJS repo to quickly spin up Web3 applications with multiple wallet support.

<img width="1440" alt="Screenshot 2022-05-07 at 15 09 43" src="https://user-images.githubusercontent.com/44173285/167257969-d23b7d1c-3674-47c4-85b4-843bec8f561d.png">

Uses [web3-react](https://www.npmjs.com/package/web3-react) to make use of React Hooks and provide the user's injected wallet as a provider.

## Supported Networks
```
mainnet = 1,
ropsten = 3,
kovan = 42,
xdai = 100,
polygon = 137,
mumbai = 80001,
avalanche = 43114,
fuji = 43113, // avalanche test network
arbitrum_one = 42161,
arbitrum_rinkeby = 421611
```

## Supported Wallets
- Browser Wallets (Metamask, Trustwallet, Enjin)
- Fortmatic (Requires Key)
- Wallet Connect
- Wallet Link
- Mew Wallet
- Authereum (Requires key)
- Torus
- Gnosis Safe
- Portis (Requires Key)
- Clover
- Venly (Requires Client Id)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
