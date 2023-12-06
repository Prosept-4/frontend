import ConnectedProducts from './ColumnConnectedProducts/ColumnConnectedProducts.jsx'
import ProseptProducts from './ColumnProseptProducts/ColumnProseptProducts.jsx'
import DealerProducts from './ColumnDealerProducts/ColumnDealerProducts.jsx'

export default function Main() {
  return (
    <main className='main'>
      <DealerProducts />
      <ProseptProducts />
      <ConnectedProducts />
    </main>
  )
}
