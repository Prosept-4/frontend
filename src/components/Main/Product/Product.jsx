const product = {
  id: 245,
  article:'008-1' ,
  ean_13:4680008140234.0,
  name: 'Антисептик невымываемыйPROSEPT ULTRAконцентрат 1:10  / 1 л',
  cost:360.0,
  recommended_price:858.0,
  category_id:20.0,
  ozon_name:'Антисептик невымываемый для ответственных конструкций PROSEPT ULTRA, концентрат, 1 л.',
  name_1c:'Антисептик невымываемый для ответственных конструкций PROSEPT ULTRA, концентрат, 1 л.',
  wb_name:'Антисептик невымываемый для ответственных конструкций PROSEPT ULTRA, концентрат, 1 л.',
  ozon_article: 189522705.0,
  wb_article: 150033482.0,
  ym_article:'008-1',
  wb_article_td:'',
}


export default function Product() {
  return (
    <div className='product'>
      <h3 className='product'>{product.name}</h3>
    </div>
  )
}
