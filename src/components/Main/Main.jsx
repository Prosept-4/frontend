import ConnectedProducts from './ColumnConnectedProducts/ColumnConnectedProducts.jsx'
import ProseptProducts from './ColumnProseptProducts/ColumnProseptProducts.jsx'
import ThirdPartyProducts from './ColumnThirdPartyProducts/ColumnThirdPartyProducts.jsx'

export default function Main() {
  return (
    <main className='main'>
      <ConnectedProducts />
      <ProseptProducts />
      <ThirdPartyProducts />
    </main>
  )
}
