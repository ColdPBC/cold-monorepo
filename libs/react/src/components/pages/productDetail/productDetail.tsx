import {ErrorPage, MainContent, Spinner, Tabs} from "@coldpbc/components";
import {useGraphQLSWR} from "@coldpbc/hooks";
import {useParams} from "react-router-dom";
import {ProductsQuery} from "@coldpbc/interfaces";
import {get, isError} from "lodash";
import {ProductBOMTab} from "../../organisms/productBOMTab/productBOMTab";

export const ProductDetail = () => {
  const {id} = useParams();

  const productQuery = useGraphQLSWR<{
    product: ProductsQuery | null
  }>('GET_PRODUCT', {
    id: id,
  })

  if(productQuery.isLoading){
    return <Spinner />
  }

  if(isError(productQuery.data)){
    const error = get(productQuery.data, 'error', new Error('An error occurred'))
    return <ErrorPage error={error.message} showLogout={false} />
  }

  const product = get(productQuery.data, 'data.product')

  if(product === null || product === undefined){
    return null
  }

  const subTitle = [
    product.productCategory,
    product.productSubcategory,
    product.seasonCode
  ].filter(
    (val) => !!val
  ).join(' | ')

  return (
    <MainContent
      title={product.name}
      subTitle={subTitle}
      breadcrumbs={[
        { label: 'Products', href: '/products' },
        { label: 'Product Detail' },
      ]}
      className={'w-[calc(100%)]'}
    >
      <Tabs
        tabs={[
          {
            label: 'Details',
            content: null
          },
          {
            label: 'BOM',
            content: <ProductBOMTab product={product} />
          },
          {
            label: 'Documents',
            content: null
          }
        ]}
      />
    </MainContent>
  )
}
