import ConnectedProducts from './ConnectedProducts/ConnectedProducts.jsx'
import ProseptProducts from './ProseptProducts/ProseptProducts.jsx'
import ThirdPartyProducts from './ThirdPartyProducts/ThirdPartyProducts.jsx'

export default function Main() {
  return (
    <main className='main'>
      <ConnectedProducts />
      <ProseptProducts />
      <ThirdPartyProducts />
    </main>
  )
}
