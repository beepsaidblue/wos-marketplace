import { useRef } from 'react'
import { CandyShop } from '@liqnft/candy-shop-sdk'
import { Orders, Stat } from '@liqnft/candy-shop'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Cluster } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS!)
const CANDY_SHOP_TREASURY_MINT = new PublicKey('WoSZYtctzp48xcdsSfGNKUGhjNdPx2qm5J2TUNfd1a1')
const CANDY_SHOP_PROGRAM_ID = new PublicKey(process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID!)
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster

const DesContainer = styled.div`
  width: 100%;
`

const MarketplaceWos: React.FC = () => {
  const wallet = useAnchorWallet();

  const candyShopRef = useRef<CandyShop>(
    new CandyShop(
      CANDY_SHOP_CREATOR_ADDRESS,
      CANDY_SHOP_TREASURY_MINT,
      CANDY_SHOP_PROGRAM_ID,
      NETWORK,
      {
        currencySymbol: 'WOS'
      }
    )
  )

  const filters = [
    {name: 'Bird', identifier: -1017643581, attribute: {Pet: 'Bird'}},
    {name: 'Bull', identifier: -1017643581, attribute: {Pet: 'Bull'}},
    {name: 'Dragon', identifier: -1017643581, attribute: {Pet: 'Dragon'}},
    {name: 'Octopus', identifier: -1017643581, attribute: {Pet: 'Octopus'}},
    {name: 'Rodent', identifier: -1017643581, attribute: {Pet: 'Rodent'}},
    {name: 'Slime', identifier: -1017643581, attribute: {Pet: 'Slime'}},
  ];

  return (
    <DesContainer>
      <Stat
        candyShop={candyShopRef.current}
        title={'W.O.S. Shop'}
        description={'Explore and buy pets and other NFTs in WOS'}
        style={{ paddingBottom: 50 }}
      />
      <Orders
        wallet={wallet}
        filters={filters}
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
      />
    </DesContainer>
  )
}

export default MarketplaceWos
